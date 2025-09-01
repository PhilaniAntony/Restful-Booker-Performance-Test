#!/bin/bash
# run-test.sh
set -a  # Automatically export all variables
source .env
set +a
# Run multiple tests sequentially
echo "🚀 Starting performance test suite..."
echo "======================================"

echo "1. Running login test..."
k6 run tests/loginTest.js

echo "2. Running booking creation test..."
k6 run tests/createBookingTest.js

echo "3. Running booking retrieval test..."
k6 run tests/getBookingsTest.js

echo "======================================"
echo "✅ All tests completed!"