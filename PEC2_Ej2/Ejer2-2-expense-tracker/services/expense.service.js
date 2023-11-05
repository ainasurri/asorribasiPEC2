/**
 * @class Service
 *
 * Manages the data of the application.
 */
class ExpenseService {
  constructor() {
    const localStorageTransactions = JSON.parse(
      localStorage.getItem('transactions')
    );
    let transactions_json = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
    this.transactions = transactions_json.map( x=> new Transaction (x));

    this.balance=0;
    this.income=0;
    this.expense=0;
    this.updateValues();
  }
  // Add transaction
  addTransaction(text, amount) {
    let transaction = new Transaction({text, amount});
    this.transactions.push(transaction);
    this.updateValues();
    this.updateLocalStorage();
  }
  updateValues (){
    const amounts = this.transactions.map(transaction => parseFloat(transaction.amount));
    if (amounts.length != 0){
      
      const total = Number(amounts.reduce((acc, item) => (acc += item), 0)).toFixed(2);

      const income = Number(amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0))
        .toFixed(2);
  
      const expense = Number(
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
      ).toFixed(2);
  
  
      this.balance=total;
      this.income=income;
      this.expense=expense;
      if (this.onTransactionInfoChanged){
        this.onTransactionInfoChanged(total, income, expense); 
        this.onTransactionListChanged(this.transactions);
      }
    }else{
      this.balance=0;
      this.income=0;
      this.expense=0;
      if (this.onTransactionInfoChanged){
        this.onTransactionInfoChanged(0, 0, 0); 
        this.onTransactionListChanged(this.transactions);
      }
    }
    
 
  }
  removeTransaction(id) {
    this.transactions = this.transactions.filter(transaction => transaction.id !== id);
    this.updateValues();
    this.updateLocalStorage();
  }
  updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }
  
  bindTransactionListChanged(callback) {
    this.onTransactionListChanged = callback;
  }

  bindTransactionInfoChanged(callback) {
    this.onTransactionInfoChanged = callback;
  }

  
  
}