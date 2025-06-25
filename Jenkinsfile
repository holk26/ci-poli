pipeline {
    agent any

    stages {
        stage('Build Backend') {
            steps {
                echo 'Building Backend...'
                dir('backend-redes-sociales') {
                    sh 'docker build -t backend-redes-app .'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo 'Building Frontend...'
                dir('redes-sociales-frontend') {
                    sh 'docker build -t frontend-redes-sociales .'
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Test Backend') {
                    steps {
                        echo 'Testing Backend...'
                    }
                }
                stage('Test Frontend') {
                    steps {
                        echo 'Testing Frontend...'
                    }
                }
            }
        }
        
        stage('Deploy') {
            parallel {
                stage('Deploy Backend') {
                    steps {
                        echo 'Deploying Backend...'
                        // Detener y eliminar el contenedor anterior del backend
                        sh 'docker stop my-backend-app || true'
                        sh 'docker rm my-backend-app || true'
                        
                        // Desplegar backend
                        sh 'docker run -d --restart=always --name my-backend-app -p 8000:8000 backend-redes-app'
                    }
                }
                stage('Deploy Frontend') {
                    steps {
                        echo 'Deploying Frontend...'
                        // Detener y eliminar el contenedor anterior del frontend
                        sh 'docker stop my-frontend-redes || true'
                        sh 'docker rm my-frontend-redes || true'
                        
                        // Desplegar frontend
                        sh 'docker run -d --restart=always --name my-frontend-redes -p 5175:80 frontend-redes-sociales'
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline ejecutado exitosamente!'
            echo 'Backend disponible en: http://localhost:8000'
            echo 'Frontend disponible en: http://localhost:5175'
        }
        failure {
            echo 'Pipeline falló. Revisar logs para más detalles.'
        }
        always {
            echo 'Limpiando recursos...'
            // Limpiar imágenes no utilizadas (opcional)
            sh 'docker image prune -f || true'
        }
    }
}
