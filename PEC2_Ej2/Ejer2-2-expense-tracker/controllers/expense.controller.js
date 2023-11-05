/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class TransactionController {
  constructor(service, view) {
    this.service = service;
    this.view = view;

    this.view.bindAddTransaction(this.handleAddTransaction);
    this.view.bindRemoveTransaction(this.handleRemoveTransaction);
    this.service.bindTransactionListChanged(this.onTransactionListChanged);
    this.service.bindTransactionInfoChanged(this.onTransactionInfoChanged);
    console.log(this.service.transactions);
    this.onTransactionListChanged(this.service.transactions);
    this.onTransactionInfoChanged(this.service.balance, this.service.income, this.service.expense);
  }

  onTransactionListChanged = transactions => {
    this.view.displayTransactions(transactions);
  };

  onTransactionInfoChanged = (balance, income, expense) => {
    this.view.updateInfo(balance, income, expense);
  };

  handleAddTransaction = (transactiontext,amount) => {
    this.service.addTransaction(transactiontext , amount);
  };

  handleRemoveTransaction = id => {
  this.service.removeTransaction(id);
  };


}
