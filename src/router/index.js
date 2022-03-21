import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'


import Cliente from '../views/Cliente/Cliente'
import ClienteLogado from '../views/Cliente/ClienteLogado'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'

import Endereco from '../views/Endereco/Endereco'
import AdicionaEndereco from '../views/Endereco/AdicionaEndereco'
import EditaEndereco from '../views/Endereco/EditaEndereco'


import Categoria from '../views/Categoria/Categoria'
import AdicionaCategoria from '../views/Categoria/AdicionaCategoria'
import EditaCategoria from '../views/Categoria/EditaCategoria'
import ListaProdutos from '../views/Categoria/ListaProdutos'

import Produto from '../views/Produto/Produto'
import AdicionaProduto from '../views/Produto/AdicionaProduto'
import EditaProduto from '../views/Produto/EditaProduto'
import ExibirDetalhesProduto from '../views/Produto/ExibirDetalhesProduto'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  //lista produtos desta categoria
  {
    path: '/categoria/exibir/:id',
    name: 'ListaProdutos',
    component: ListaProdutos
  },
  {
    path: '/admin/categoria',
    name: 'Categoria',
    component: Categoria
  },
  {
    path: '/admin/adicionaCategoria',
    name: 'AdicionaCategoria',
    component: AdicionaCategoria
  },
  {
    path: '/admin/categoria/:id',
    name: 'EditaCategoria',
    component: EditaCategoria
  },

  //produtos
  {
    path: '/admin/produto',
    name: 'ProdutoAdmin',
    component: Produto
  },
  {
    path: '/admin/adicionaProduto',
    name: 'AdicionaProduto',
    component: AdicionaProduto
  },
  {
    path: '/admin/produto/:id',
    name: 'EditaProduto',
    component: EditaProduto
  },
  //detalhes dos produtos
  {
    path: '/produto/exibir/:id',
    name: 'ExibirDetalhesProduto',
    component: ExibirDetalhesProduto
  },

  //clientes
  {
    path: '/admin/cliente',
    name: 'Cliente',
    component: Cliente
  },
  {
    path: '/cliente/clienteLogado',
    name: 'ClienteLogado',
    component: ClienteLogado
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  //endereços
  {
    path: '/cliente/enderecos',
    name: 'Endereco',
    component: Endereco
  },

  {
    path: '/cliente/adicionaEndereco',
    name: 'AdicionaEndereco',
    component: AdicionaEndereco
  },
 { path: '/cliente/editaEndereco/:id',
  name: 'EditaEndereco',
  component: EditaEndereco

}

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
