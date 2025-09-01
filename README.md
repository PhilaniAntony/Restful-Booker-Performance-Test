# Restful Booker Performance Tests

![K6](https://img.shields.io/badge/k6-0.45.0-blue)
![Performance Testing](https://img.shields.io/badge/Testing-Performance-green)
![REST API](https://img.shields.io/badge/API-REST-orange)

A comprehensive performance testing suite for the Restful Booker API using Grafana k6. This repository contains load tests, stress tests, and endurance tests to ensure the API meets performance requirements.

## 📋 About the Project

This performance testing suite is designed for **Restful Booker API** - a demo API for booking management. The tests validate the API's performance under various load conditions and help identify potential bottlenecks.

**API Documentation**: https://restful-booker.herokuapp.com/apidoc/index.html

**Repository**: https://github.com/PhilaniAntony/Restful-Booker-Performance-Test.git

## 🚀 Features

- **Load Testing**: Simulate normal and peak traffic conditions
- **Stress Testing**: Identify breaking points and maximum capacity
- **Endurance Testing**: Verify stability over extended periods
- **Multiple Scenarios**: Authentication, booking CRUD operations, and search functionality
- **CI/CD Ready**: Integrated with GitHub Actions for automated testing
- **Environment Configuration**: Secure management of test credentials

## 📁 Repository Structure

```
Restful-Booker-Performance-Tests/
├── tests/
│ ├── loginTest.js # Authentication performance test
│ ├── bookingTest.js # Booking CRUD operations test
│ ├── userProfileTest.js # User management test
│ ├── searchTest.js # Search functionality test
│ └── loadTest.js # Comprehensive load test
├── helpers/
│ └── auth.js # Authentication helper functions
├── data/
│ └── bookingData.json # Test data payloads
├── .env.example # Environment variables template
├── run-test.sh # Test runner script
├── k6.config.js # K6 configuration
└── README.md
```

## 🛠️ Prerequisites

Before running the tests, ensure you have:

- **k6** installed ([Installation Guide](https://grafana.com/docs/k6/latest/get-started/installation/))
- **Bash shell** (for Linux/macOS) or **WSL/Git Bash** (for Windows)
- **Git** for cloning the repository

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/PhilaniAntony/Restful-Booker-Performance-Tests.git
cd Restful-Booker-Performance-Tests
```

### 2. Setup Environment Variables

```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file with your test credentials
touch .env  # or use your preferred text editor
```

#### Add the following to your .env file:

```
USERNAME=admin
PASSWORD=password123
API_URL=https://restful-booker.herokuapp.
```

#### Note: .env is gitignored for security - never commit actual credentials!

### 3. Make the Runner Script Executable

```bash
chmod +x run-test.sh
```

### 4. Run the Tests

**Run all tests:**

```bash
./run-test.sh
```

**Run specific tests:**

```bash
./run-test.sh login booking
```

**Run with custom environment variables:**

```bash
USERNAME=testuser PASSWORD=testpass API_URL=https://api.example.com ./run-test.sh
```

## 📊 Test Scenarios

### 1. Smoke Test

- Verify basic functionality with minimal load
- 1-5 virtual users
- Short duration (30-60 seconds)

### 2. Load Test

- Simulate expected production traffic
- 50-100 virtual users
- 5-10 minute duration

### 3. Stress Test

- Identify system breaking points
- Gradually increasing load (spike testing)
- Monitor error rates and response times

### 4. Endurance Test

- Verify system stability over time
- 8-24 hour duration
- Monitor memory leaks and performance degradation

### 5. 🎯 Performance Targets

- The tests validate against these thresholds:
- Response Time: p(95) < 500ms
- Error Rate: < 1%
- Availability: 99.9% uptime
- Throughput: > 100 requests/second

## 🤖 CI/CD Integration

The repository includes GitHub Actions workflow for automated testing. 

**To set up:**
**Add secrets to your GitHub repository**

- USERNAME: API username
- PASSWORD: API password
- API_URL: API base URL

## Push changes to trigger automated tests

### 📈 Results Interpretation

**Test results include:**

- HTTP Request Duration: Average, median, p90, p95 response times
- Request Rate: Requests per second
- Error Rate: Percentage of failed requests
- Checks: Custom validation pass/fail rates
- Data Transfer: Network usage metrics

## 🐛 Troubleshooting

**Common Issues:**

- Connection Refused: Verify API_URL is correct and service is running
- Authentication Failed: Check USERNAME and PASSWORD in .env file
- Test Timeout: Increase timeout values in test configuration

## Windows Users

**For Windows systems, use Git Bash or WSL:**

```bash
# Using Git Bash
./run-test.sh

# Or using PowerShell with manual env setup
$env:USERNAME="admin"
$env:PASSWORD="password123"
$env:API_URL="https://restful-booker.herokuapp.com"
k6 run tests/loginTest.js
```

## 🤝 Contributing

**We welcome contributions! Please feel free to:**

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Submit a pull request

### Development Guidelines

- Follow existing code style and patterns
- Add appropriate comments and documentation
- Include test scenarios for new features
- Update README.md with relevant changes

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Restful Booker Team** for providing the demo API
- **Grafana Labs** for the excellent k6 performance testing tool
- **Open Source Community**§ for continuous inspiration and support

## 📞 Support

**If you encounter any issues or have questions:**

1. Check the API Documentation
2. Review existing GitHub Issues
3. Create a new issue with detailed description

## Happy Testing! 🚀

Remember: Performance testing is not just about finding problems, but about building confidence in your system's reliability and scalability.