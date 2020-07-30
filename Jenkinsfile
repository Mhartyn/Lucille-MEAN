pipeline {
    agent { 
        dockerfile true 
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh '''
                    npm install
                    npm run tsc
                    '''
            }
        }
        stage('Deliver') {
            steps {
                sh '''
                    npm run build
                    npm start
                    '''                
            }
        }
    }
}
