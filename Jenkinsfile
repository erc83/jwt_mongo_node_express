pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        echo 'git'
        git(url: 'https://github.com/erc83/jwt_mongo_node_express', branch: 'main')
      }
    }

    stage('') {
      steps {
        sh 'ls -la'
      }
    }

  }
}