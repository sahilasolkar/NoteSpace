pipeline {
    agent any
    stages {
        stage('checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/dockerized']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/FaiyazJambotkar/NoteSpace.git']])
            }
        }

        stage('container-build') {
            steps {
                sh 'docker build . -t FaiyazJambotkar/NoteSpace'
            }
        }

        stage('container-run') {
            steps {
                sh 'docker run -p 49160:3000 FaiyazJambotkar/NoteSpace'
            }
        }

        stage('container-list') {
            steps {
                sh 'docker ps'
            }
        }
    }
}
