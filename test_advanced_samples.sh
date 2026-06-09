#!/bin/bash
# Test script for all advanced malware samples

echo "============================================"
echo "Testing Advanced Malware Samples"
echo "============================================"
echo ""

# Test Sample 1: Advanced Stealth Exfiltration
echo "📊 Testing Sample 1: Advanced Stealth Exfiltration"
echo "---------------------------------------------------"
node dist/main.js analyze \
  --type DIR \
  --input ./samples/advanced_stealth_exfiltration/ \
  --out ./output/test_sample_1/ \
  --id aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

echo ""
echo "Results:"
cat output/test_sample_1/summary.json | grep -E '"findings"|"flowTypeCounts"|"nodeCoverage"|"scopeCoverage"' | head -10
echo ""

# Test Sample 2: Obfuscated Code Injection
echo "📊 Testing Sample 2: Obfuscated Code Injection"
echo "---------------------------------------------------"
node dist/main.js analyze \
  --type DIR \
  --input ./samples/obfuscated_code_injection/ \
  --out ./output/test_sample_2/ \
  --id bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb

echo ""
echo "Results:"
cat output/test_sample_2/summary.json | grep -E '"findings"|"flowTypeCounts"|"nodeCoverage"|"scopeCoverage"' | head -10
echo ""

# Test Sample 3: Event Driven Attack
echo "📊 Testing Sample 3: Event Driven Attack"
echo "---------------------------------------------------"
node dist/main.js analyze \
  --type DIR \
  --input ./samples/event_driven_attack/ \
  --out ./output/test_sample_3/ \
  --id cccccccccccccccccccccccccccccccc

echo ""
echo "Results:"
cat output/test_sample_3/summary.json | grep -E '"findings"|"flowTypeCounts"|"nodeCoverage"|"scopeCoverage"' | head -10
echo ""

echo "============================================"
echo "Testing Complete"
echo "============================================"
echo ""
echo "View detailed reports:"
echo "  output/test_sample_1/summary.json"
echo "  output/test_sample_2/summary.json"
echo "  output/test_sample_3/summary.json"
