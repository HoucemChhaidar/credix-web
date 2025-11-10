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
  transferWalletDialog: boolean = false;
  walletToTransfer: any = null; 
  walletTransfert: any = null;
  role : string
  constructor(private walletService: WalletService, private breadcrumbService: BreadcrumbService, private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Pages' },
      { label: 'Wallets', routerLink: ['/pages/wallet'] }
    ]);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
	  this.role = user.role 
    }

  }

  ngOnInit() {
    this.loadWallet();
    this.cols = [
      { field: 'balance', header: 'Balance (DT)' },
      { field: 'transferAmount', header: 'Transfer Amount (DT)' },
      { field: 'companyName', header: 'Company Name' },
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

    this.walletService.sendMoney().then(response => {
        console.log('Transfer response:', response);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Amount transferred successfully'});
        this.loadWallet(); 
    }).catch(error => {
        console.error('Error during transfer:', error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to transfer amount'});
    });
    this.transferDialog = false;

  }

  tranfertAmount(wallet: any) { 
    console.log('Transfert amount pour le wallet:', wallet);
    this.walletToTransfer = wallet;
    this.transferWalletDialog = true;
    this.walletTransfert = wallet;
  }
confirmTransferWallet() {
  this.walletService.sendMoneyToWallet(this.walletToTransfer.tokenizedId, this.walletToTransfer.transferAmount).then(response => {
      console.log('Transfer response:', response);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Amount transferred successfully'});
      this.loadWallet(); 
  }).catch(error => {
      console.error('Error during transfer:', error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to transfer amount'});
  });
  this.transferWalletDialog = false;  
}

}
