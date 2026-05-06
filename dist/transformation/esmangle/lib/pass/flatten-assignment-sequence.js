/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jslint bitwise:true */
/*global module:true, require:true*/
(function () {
    'use strict';

    var Name, Syntax, common, modified;
    
    Name = 'flatten-assignment-sequence';
    common = require('../common');
    Syntax = common.Syntax;
    const { types: t } = require('@babel/core');

    function flattenAssignmentSequence(tree, options) {
        modified = false;
        const result = options.get('destructive', { pathName: Name }) ? tree : common.deepCopy(tree);

        // 递归处理节点的函数
        function processNode(node) {
            if (!node || node._processed) return node;

            // 处理赋值表达式右侧是逗号表达式的情况
            if (node.type === Syntax.AssignmentExpression &&
                node.right.type === Syntax.SequenceExpression) {
                
                const seq = node.right;
                if (seq.expressions.length === 0) return node;

                // 标记当前节点已处理
                node._processed = true;

                // 处理前n-1个表达式
                const prevExpressions = seq.expressions
                    .slice(0, -1)
                    .map(e => processNode(common.deepCopy(e)));

                // 处理最后一个表达式
                const lastExpression = processNode(common.deepCopy(seq.expressions[seq.expressions.length - 1]));

                // 构建新节点
                const newAssignment = t.assignmentExpression(
                    node.operator,
                    node.left,
                    lastExpression
                );
                const newSequence = t.sequenceExpression([
                    ...prevExpressions,
                    newAssignment
                ]);

                modified = true;
                return newSequence;
            }

            // 递归处理子节点
            Object.keys(node).forEach(key => {
                if (key === 'type' || key === '_processed') return;
                const value = node[key];
                if (Array.isArray(value)) {
                    node[key] = value.map(item => processNode(item));
                } else if (value && typeof value === 'object') {
                    node[key] = processNode(value);
                }
            });

            return node;
        }

        // 处理整个AST
        return {
            result: processNode(result),
            modified: modified
        };
    }

    flattenAssignmentSequence.passName = Name;
    module.exports = flattenAssignmentSequence;
}());