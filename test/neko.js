var chai = require('chai');
var expect = chai.expect;
var app = require('../app');
//var router = require('../routes/Cat
var models = require('../models');
var Cat = models.Cat;


describe('post function', function() {

	beforeEach('create cats', function() {
		var cat1 = Cat.create({
			name: "Newt",
			type: "tabby",
			color: "grey, white",
			atCafe: true

		});

		var cat2 = Cat.create({
			name: "Pippa",
			type_breed: "tuxedo",
			color: "black, white",
			atCafe: false
		})

		var cat3 = Cat.create({
			name: "Sally",
			type_breed: "tabby",
			color: "brown",
			atCafe: true
		})

		var cat4 = Cat.create({
			name: "Clementine",
			color: "orange",
			atCafe: true
		}
		                      )

		return Promise.all([
		   cat1, cat2, cat3, cat4
		]);
	});

	it('should exist', function() {
		expect(Cat).to.be.an('object');
		expect(cat1).to.be.an('object');
		expect(cat2).to.be.an('object');
		expect(cat3).to.be.an('object');
		expect(cat4).to.be.an('object');
	});

	describe('find by atCafe column', function() {

		it('should give us back Newt when called w/ true', function(){

			return Cat
			.findAll({
				where: Cat
				.atCafe === 'true'
			}).then(function(foundCat
			                 ) {
				const catNames = foundCat
				.map(function(cat) { return cat.name;
				}).sort();
				return catNames;
			}).then(function(names) {
				expect(names).to.be.deep.equal(['Franny', 'Newt']);
			});
		})

	})

})
