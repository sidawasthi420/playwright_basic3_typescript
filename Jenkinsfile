pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        CI = 'true'
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test'
            }
        }
    }

    post {
        always {
            junit testResults: 'junit.xml', allowEmptyResults: true
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }

        failure {
            echo 'Test execution failed!'
        }

        success {
            echo 'Tests passed successfully!'
        }
    }
}