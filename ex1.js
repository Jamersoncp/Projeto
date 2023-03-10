"use strict"

const prompt = require('prompt-sync')();
let fs = require('fs');

const arq_palavras = 'palavras.json'


function carregar_palavras(){
     let dados = fs.readFileSync(arq_palavras)
     return JSON.parse(dados)
}

function salvar_palavra(palavras){
     let str = JSON.stringify(palavras)
     fs.writeFileSync(arq_palavras, str)
}

let palavras = carregar_palavras()

function cad_palavras(palavras){
     let aux = false
     let palavra = "";
     while (palavra == ""){
          palavra  = prompt("Palavra? : ")
     }
     for(let elemento of palavras){
          if(elemento.palavra == palavra){
               console.log("Palavra ja cadastrada")
               aux = true
               
          }
     }
     if( aux == false){
          let dica = "";
          while (dica == ""){
               dica = prompt("Dica? : ")
          }
          console.log()
          palavras.push({palavra, dica})
          console.log(`A palavra ${palavra} foi adicionada`)
          console.log()
          salvar_palavra(palavras)
        
     }
     
     
}

function listar(palavras){
     palavras = carregar_palavras()
     console.log("===PALAVRAS CADASTRADAS===")
     for(let elemento of palavras){
          console.log(`${elemento.palavra} : ${elemento.dica}`)
     }
}

function remover(palavras){
     let palavra = ""
     while(palavra == ""){
          palavra = prompt("Palavra que deseja remover ? : ")
     }
     console.log()
     let tam_inicial = palavras.length
     palavras = palavras.filter((elemento)=> elemento['palavra'] != palavra)
     if(tam_inicial != palavras.length){
          console.log(`A palavra ${palavra} foi removida.`)
          console.log()
          salvar_palavra(palavras)
     }else{
          console.log(`Não foi encontrado nenhuma palavra como esta: ${palavra}`)
          console.log()
     }
}


function menu(){
     
     console.log(`\n1 - Listar palavras cadastradas
     2 - Cadastrar palavra\n
     3 - Remover palavra\n
     4 - Sair`)
     let ope = Number(prompt("Opção: "))
     console.log()
     return ope
}




let opcao;

do{
     opcao = menu();
     switch(opcao){
     

     case 1: listar(palavras);
          break;

     case 2: cad_palavras(palavras);
          break;
     
     case 3: remover(palavras);
          break;
     }
     
}while(opcao!=4)
