pipeline {
    agent any

    tools {
        terraform 'terraform-11'
        nodejs 'nodejs-19.8'
    }

    stages {

        stage('git checkout') {
            steps {
                git branch: 'dockerized', url: 'https://github.com/FaiyazJambotkar/NoteSpace.git'
            }
        }

        parallel firstBranch: {

            stage('container-build') {
                steps {
                    sh 'docker build . -t ~/NoteSpace'
                }
            }

            stage('container-run') {
                steps {
                    sh 'docker run -p 49160:3000 ~/NoteSpace'
                }
            }

            stage('container-list') {
                steps {
                    sh 'docker ps'
                }
            }

        }, secondBranch: {
            
        },
        failFast: true
    }
}
