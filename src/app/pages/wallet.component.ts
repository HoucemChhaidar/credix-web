import { Component, OnInit } from '@angular/core';
import { WalletService } from '../demo/service/wallet.service';
import { BreadcrumbService } from '../breadcrumb.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  providers: [MessageService, ConfirmationService],
  
})
export class WalletComponent implements OnInit {
  wallets: any[] = [];
  cols: any[] = [];
  selectedWallets: any[] = [];
  transferDialog: boolean = false; 

  constructor(private walletService: WalletService, private breadcrumbService: BreadcrumbService, private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Pages' },
      { label: 'Wallets', routerLink: ['/pages/wallet'] }
    ]);
  }

  ngOnInit() {
    this.loadWallet();
    this.cols = [
      { field: 'balance', header: 'Balance (DT)' },
      { field: 'transferAmount', header: 'Transfer Amount (DT)' },
      { field: 'userEmail', header: 'Email' },
      { field: 'active', header: 'Active' },
      { field: 'createdAt', header: 'Created At' }
    ];
  }

  async loadWallet() {
    try {
      const walletsRsponse = await this.walletService.getWallet();
      this.wallets = walletsRsponse['data'];
      console.log('Wallets:', walletsRsponse);
    } catch (error) {
      console.error('Error loading wallets:', error);
    }
  }

    editWallet(wallet: any) {
    console.log('Edit wallet:', wallet);
    // logique pour éditer le wallet
  }

  deleteWallet(wallet: any) {
    console.log('Delete wallet:', wallet);
    // logique pour supprimer le wallet
  }
transferAmount() {
  if(this.selectedWallets && this.selectedWallets.length > 0) {
    console.log('Transfert amount pour les wallets sélectionnés:', this.selectedWallets);
  }
}

confirmTransfer() {
    console.log('Transferring amount to wallets:', this.selectedWallets);
    this.transferDialog = false;

  }



}
