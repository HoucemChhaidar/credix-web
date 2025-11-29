import { Component, OnInit } from '@angular/core';
import { Product } from '../demo/domain/product';
import { ProductService } from '../demo/service/productservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbService } from '../breadcrumb.service';
import { UserService } from '../demo/service/user.service';

@Component({
  templateUrl: './app.crud.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['../../assets/demo/badges.scss']
})
export class AppCrudComponent implements OnInit {

  userDialog: boolean;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[];

  product: Product;

  selectedProducts: Product[];

  submitted: boolean;

  cols: any[];

  statuses: any[];
  deleteUserDialog = false;

  rowsPerPageOptions = [5, 10, 20];
  users: any[] = [];
  selectedUsers: any[] = [];
  user: any = {};
  roles = [
    { label: 'Utilisateur', value: 'USER' },
    { label: 'Administrateur', value: 'ADMIN' }
  ];


  constructor(private productService: ProductService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService,
    private userService: UserService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Pages' },
      { label: 'Users', routerLink: ['/pages/users'] }
    ]);
  }

  ngOnInit() {
    // this.productService.getProducts().then(data => this.products = data);
    // this.userService.getUsers().then(data => {console.log(`>>>`, data)});

    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'role', header: 'Role' },
      { field: 'active', header: 'Active' },
      { field: 'createdAt', header: 'Created At' }
    ];
    this.loadUsers();


    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.user = {};     // vide
    this.submitted = false;
    this.userDialog = true;
  }
  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.userDialog = true;
  }

  deleteProduct(product: Product) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedProducts = null;
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.products = this.products.filter(val => val.id !== this.product.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.product = {};
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.id) {
        // @ts-ignore
        this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.product.id = this.createId();
        this.product.code = this.createId();
        this.product.image = 'product-placeholder.svg';
        // @ts-ignore
        this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.userDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  loadUsers() {
    this.userService.getUsers().then(res => {
      if (res && res['data']) {
        this.users = res['data'];
      }
    });
  }

  async saveOrUpdateUser() {
    this.submitted = true;

    // Validation
    if (!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.role) {
      console.warn("Champs requis manquants !");
      return;
    }

    try {
      let response;

      // 🟡 MODE ÉDITION
      if (this.user.id) {
        response = await this.userService.updateUser(this.user.id, this.user);
        console.log('Utilisateur mis à jour :', response);

        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Utilisateur modifié',
          life: 3000
        });

        // 🟢 MODE AJOUT
      } else {
        response = await this.userService.createUser(this.user);
        console.log('Utilisateur créé :', response);

        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Utilisateur ajouté',
          life: 3000
        });
      }

      this.userDialog = false;
      this.loadUsers(); // recharge la liste

    } catch (error) {
      console.error('Erreur utilisateur :', error);

      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: this.user.id ? 'Échec de modification' : 'Échec de création',
        life: 3000
      });
    }
  }

  editUser(existingUser: any) {
    this.user = { ...existingUser };
    this.submitted = false;
    this.userDialog = true;
  }
  confirmDeleteUser(user: any) {
    this.user = { ...user };
    this.deleteUserDialog = true;
  }

  async deleteUser() {
    try {
      await this.userService.deleteUser(this.user.id);

      this.messageService.add({
        severity: 'success',
        summary: 'Supprimé',
        detail: 'Utilisateur supprimé'
      });

      this.deleteUserDialog = false;
      this.loadUsers();

    } catch (err) {
      console.error(err);
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de supprimer'
      });
    }
  }

}
