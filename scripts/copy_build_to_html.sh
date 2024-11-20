#!/bin/bash

BUILD_DIR="/var/www/html/build"  
DEST_DIR="/var/www/html"

# Verificar se o diretório build existe
if [ -d "$BUILD_DIR" ]; then
    echo "Copiando os arquivos de build para $DEST_DIR..."

    cp -r $BUILD_DIR/* $DEST_DIR/
    rm -r $BUILD_DIR

    chown -R apache:apache $DEST_DIR/*
    chmod -R 755 $DEST_DIR/*

    echo "Arquivos copiados com sucesso!"
else
    echo "Erro: Diretório de build não encontrado em $BUILD_DIR"
    exit 1
fi
