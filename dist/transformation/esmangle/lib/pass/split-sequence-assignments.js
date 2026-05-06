/*jslint bitwise:true */
/*global module:true, require:true*/
(function () {
    'use strict';

    var Name, Syntax, common, modified;
    
    Name = 'split-sequence-assignments';
    common = require('../common');
    Syntax = common.Syntax;
    
    function shouldTransform(node, parent) {
        // 仅处理以下两种场景：
        // 1. 表达式语句中的逗号表达式 (a=1, b=2)
        // 2. 赋值表达式右侧的逗号表达式 x = (a=1, b=2)
        return node.type === Syntax.SequenceExpression && 
            (parent.type === Syntax.ExpressionStatement || 
             (parent.type === Syntax.AssignmentExpression && parent.right === node));
    }

    function splitSequenceAssignments(tree, options) {
        modified = false;
        var result = options.get('destructive', { pathName: Name }) ? tree : common.deepCopy(tree);

        common.traverse(result, {
            enter: function (node, parent) {
                if (!shouldTransform(node, parent)) return;

                var expressions = node.expressions;
                if (expressions.length < 2) return;

                var replacement = [];
                // Case 1: 表达式语句中的序列表达式
                if (parent.type === Syntax.ExpressionStatement) {
                    replacement = expressions.map(function(expr) {
                        return { type: Syntax.ExpressionStatement, expression: expr };
                    });
                }
                // Case 2: 赋值表达式右侧的序列表达式
                else if (parent.type === Syntax.AssignmentExpression) {
                    // 提取前 N-1 个表达式作为独立语句
                    var preceding = expressions.slice(0, -1).map(function(expr) {
                        return { type: Syntax.ExpressionStatement, expression: expr };
                    });
                    
                    // 构建最终赋值表达式
                    var lastExpr = expressions[expressions.length - 1];
                    var finalAssignment = {
                        type: Syntax.ExpressionStatement,
                        expression: {
                            type: Syntax.AssignmentExpression,
                            operator: parent.operator,
                            left: parent.left,
                            right: lastExpr
                        }
                    };
                    
                    replacement = preceding.concat(finalAssignment);
                }

                common.replace(parent, replacement);
                modified = true;
            }
        });

        return { result: result, modified: modified };
    }

    splitSequenceAssignments.passName = Name;
    module.exports = splitSequenceAssignments;
}());