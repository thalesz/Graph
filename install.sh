#!/bin/bash

# Instala as dependências do projeto React
echo "Instalando dependências do projeto React..."
cd Cliente
npm install  # ou use yarn se preferir

# Instala as dependências do projeto Node.js
echo "Instalando dependências do projeto Node.js..."
cd Servidor/server
npm install  # ou use yarn se preferir

echo "Instalação concluída em ambos os projetos."
