//class Imoveis{

	function generateDate(){
		const year = ['2021', '2022']; 
		const day = Math.floor(Math.random() * 30 + 1);
		const month = Math.floor(Math.random() * 11 + 1);
		let _year = year[Math.floor(Math.random() * 1 + 1)];
		console.log('date? ', day, month, _year);
		const schedule = new Date(_year, month, day);
		return schedule.toLocaleDateString();
	}

	imoveis = [
		{
			id: 1,
			data_limite: generateDate(),
			nome: 'Condomínio NodeJS',
			tipo: 'Apartamento',
			endereco: 'Rua Teste, Bairro Teste, 999, São Luís, MA, 00000-000',
			valor_aluguel: 'R$135,00/noite',
			status: 'Disponível',
			nome_cliente: ''
		},
		{
			id: 2,
			data_limite: generateDate(),
			nome: 'Condomínio ECP',
			tipo: 'Casa',
			endereco: 'Rua Teste2, Bairro Teste2, 999, São Luís, MA, 99999-999',
			valor_aluguel: 'R$99,00/noite',
			status: 'Disponível',
			nome_cliente: ''
		}
	];


	function addImovel(new_imovel)
	{
		this.imoveis.push(new_imovel);
		console.log('Novo aluguel cadastrado com sucesso');
	}

	function showImoveis()
	{
		 this.imoveis.forEach((element)=>{
		 	console.log(element.nome)
		 	console.log(element.data_limite)
		 	console.log(element.tipo)
		 	console.log(element.endereco)
		 	console.log(element.valor_aluguel)
		 	console.log(element.status)
		 	console.log(element.nome_cliente)
		 	console.log()
		 })
	}

	function reserveApartment(id, nome_cliente)
	{
		const ap = this.imoveis.find((element) => {return element.id === id});
		ap['status'] = 'Indisponível';
		ap['nome_cliente'] = nome_cliente;
		this.imoveis[ap['id'] - 1] = ap;
	}

	
	function size(){
		console.log('size ', this.imoveis.length);
		return this.imoveis.length;
	}


const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.listen(3333);


app.get('/list', (req, res) => {
	try{
		const list = showImoveis();
    	res.status(200).send(list);
	}catch(erro){
		res.status(500).send(`Solicitação não antendida. Error ${erro}`);
	}
});

app.get('/prazo', (req, res) => {
	try{
		let data = [];
	const prazo = imoveis.forEach((element)=>{
		 	console.log(element.nome);
		 	console.log(element.data_limite);
		 	console.log();
		 	let teste = [element.nome, element.data_limite];
		 	data.push(teste);
		 })
    res.status(200).send(data);
	}catch(erro){
		res.status(500).send(`Solicitação não antendida. Error ${erro}`);
	}
	
});




app.post('/new_imovel', async (req, res) => {
	try{
			const data = req.query;
			const id = size() + 1;
		    const new_imovel = {
		    				id: id,	
		  					nome: data['nome'],
							endereco: data['endereco'],
							tipo: data['tipo'],
							valor_aluguel: data['valor_aluguel'],
							status: 'Indisponível',
							nome_cliente: ''
		  				}
		   	addImovel(new_imovel);
			res.status(200).send(`Imovel cadastrado ${JSON.stringify(new_imovel)}`); 
	}catch(erro){
		res.status(500).send(`Solicitação não antendida. Error ${erro}`);
	}      
})


app.post('/reserva', async (req, res) => {
	try{
		const data = req.query;
		console.log('data reserva ', data);
		const id = Number(data['id']);
		const nome_cliente = data['nome_cliente'];

		reserveApartment(id, nome_cliente);
		res.status(204).send(`Reserva realizada com sucesso ${id}`);
	}catch(erro){
		res.status(500).send(`Solicitação não antendida. Error ${erro}`);
	}
	
})

/*app.delete('/delete/:id', async (req, res) => {
   const id = req.params.id;
   console.log('id ', id);
   res.status(204).send(`Delete id: ${id}`);
})*/