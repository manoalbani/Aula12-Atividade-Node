const express = require('express');

const server = express();

server.use(express.json());

// Criar backend para gestão de veiculos

// Rotas
// GET - '/veiculos' (Buscar todos os veiculos)
// GET - '/veiculos/:placa' (Buscar veiculo pela placa)

// POTS - '/veiculos' (Cadastrar Veiculo)

// PUT - '/veiculos/:placa' (Atutaliza Veiculo)

// DELETE - '/veiculos/:placa' (Excluir Veiculo)


let veiculos = [{placa:'QQQ5B18', marca: 'Renault', modelo:'Sandero'}, 
                {placa:'MJZ8644', marca: 'Renault', modelo:'Megane'}];

server.get('/veiculos', (req, res)=>{
    return res.json(veiculos);
});

server.get('/veiculos/:placa', (req, res)=>{
    const placa = req.params.placa;
    res.json(getVeiculoByPlaca(placa));
});

server.post('/veiculos', (req, res)=>{
    const veiculoReq = req.body;
    const veiculo =  getVeiculoByPlaca(veiculoReq.placa);
    if(veiculo){
        return res.status(500).json('Placa já cadastrada');
    }
    veiculos.push(veiculoReq);
    return res.json(veiculos);
});

function getVeiculoByPlaca(placa){
    return veiculos.find(x=> x.placa == placa.toUpperCase());
};

server.put('/veiculos/:placa', (req, res)=>{
    const placa = req.params.placa;
    const veiculo =  getVeiculoByPlaca(placa);
    const veiculoReq = req.body;
    if(veiculo){
        if(placa != veiculoReq.placa){
            return res.status(500).json('Não é possivel Alterar a Placa');
        }
        veiculos[veiculos.indexOf(veiculo)] = veiculoReq;
        return res.json(veiculos);
    }
    return res.status(500).json('Placa não encontrado');
});

server.delete('/veiculos/:placa', (req, res)=>{
    const placa = req.params.placa;
    const veiculo =  getVeiculoByPlaca(placa);
    if(veiculo){
        veiculos.splice(veiculos.indexOf(veiculo), 1);
        return res.json(veiculos);
    }
    return res.status(500).json('Placa não encontrada');
    });

server.listen(3333,() =>{
console.log('SystemUp!')
});