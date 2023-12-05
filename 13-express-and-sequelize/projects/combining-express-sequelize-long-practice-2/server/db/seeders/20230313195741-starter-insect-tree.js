'use strict';

const {Insect, Tree, InsectTree} = require("../models");

const insectTreeSeed1 = [
  {
    insect: { name: "Western Pygmy Blue Butterfly" },
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insect: { name: "Patu Digua Spider" },
    trees: [
      { tree: "Stagg" },
    ],
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   for (const insectTrees of insectTreeSeed1) {
    let setInsect = insectTrees.insect;
    let insectForId = await Insect.findOne({where: {name: setInsect.name}})
    let setTrees = insectTrees.trees;
    for (const setTree of setTrees) {
      let treeForId = await Tree.findOne({where:{tree: setTree.tree}});
      await InsectTree.create({
          insectId: insectForId.id,
          treeId: treeForId.id
        }
      )
    }
   }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (const insectTrees of insectTreeSeed1) {
      let setInsect = insectTrees.insect;
      let insect = await Insect.findOne({name: setInsect.name})
      let setTrees = insectTrees.trees;
      for (const setTree of setTrees) {
        let tree = await Tree.findOne({tree: setTree.tree});
        await InsectTree.destroy({
         where: {
            insectId: insect.id,
            treeId: tree.id
          }
        })
      }
     }
  }
};
