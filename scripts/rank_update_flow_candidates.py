"""Rank same-tool Flow candidates using code evidence; produce no manual verdicts."""
from __future__ import annotations

import json
import re
from difflib import SequenceMatcher
from pathlib import Path

from build_update_review_evidence import marked_code


def normalized_tokens(code: str | None) -> list[str]:
    if not code:
        return []
    code = re.sub(r"<pdg_js\.[^>]+>", "__abstract_value__", code)
    parts = re.findall(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`|[A-Za-z_$][\w$]*|\d+(?:\.\d+)?|[^\s]', code)
    keywords = {"var","let","const","if","for","in","of","new","try","get","set","async"}
    result = []
    for i, part in enumerate(parts):
        if re.fullmatch(r"[A-Za-z_$][\w$]*",part) and len(part)<=3 and part not in keywords and (i==0 or parts[i-1]!='.'):
            part = "_v"
        result.append(part)
    return result


def similarity(a: str | None, b: str | None) -> float:
    x,y=normalized_tokens(a),normalized_tokens(b)
    if not x or not y:
        return 0.0
    return round(SequenceMatcher(None,x,y,autojunk=False).ratio(),3)


def main():
    root=Path(__file__).resolve().parents[1]
    path=root/"datasets/updates/revalidation/source-review-evidence.json"
    data=json.loads(path.read_text(encoding="utf-8"))
    for extension in data['extensions']:
        for flow in extension['flows']:
            for report in flow['tool_reports']:
                old=report['old_report_pair']
                a=(old.get('source') or {}).get('code')
                b=(old.get('sink') or {}).get('code')
                for candidate in report['candidate_pairs']:
                    c=(candidate.get('source') or {}).get('code')
                    d=(candidate.get('sink') or {}).get('code')
                    src_score=similarity(a,c)
                    sink_score=similarity(marked_code(b) or b,marked_code(d) or d)
                    old_remark=report.get('sink_remark')
                    new_remark=(candidate.get('sink') or {}).get('remark')
                    specific_remark=old_remark not in (None,'','null','[Unknown URL]','unknown','CoCo sink evidence','storage.fuzzy.settings')
                    exact_remark=bool(specific_remark and old_remark==new_remark)
                    source_remark_match = bool((old.get('source') or {}).get('remark') and
                        (old.get('source') or {}).get('remark') == (candidate.get('source') or {}).get('remark'))
                    source_actual = similarity((old.get('source') or {}).get('actual_source_excerpt'),
                                               (candidate.get('source') or {}).get('actual_source_excerpt'))
                    sink_actual = similarity((old.get('sink') or {}).get('actual_source_excerpt'),
                                             (candidate.get('sink') or {}).get('actual_source_excerpt'))
                    candidate['identity_evidence']={
                        'source_context_similarity':src_score,'sink_expression_similarity':sink_score,
                        'actual_source_context_similarity': source_actual,
                        'actual_sink_context_similarity': sink_actual,
                        'source_remark_match': source_remark_match,
                        'specific_sink_remark_match':exact_remark,
                        'sink_expression_same_after_short_identifier_normalization':sink_score==1.0,
                        'ranking_score':round(sink_score*0.30+source_actual*0.25+sink_actual*0.25+
                                              (0.10 if exact_remark else 0)+(0.10 if source_remark_match else 0),3),
                        'meaning':'Similarity is candidate-ranking evidence only, not a proof of Flow identity or exploitability.',
                    }
                report['candidate_pairs'].sort(key=lambda c:c['identity_evidence']['ranking_score'],reverse=True)
    path.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding="utf-8")
    print('Candidate ranks saved:',path)


if __name__=='__main__':
    main()
