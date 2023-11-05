/**
 * @class View
 *
 * Visual representation of the model.
 */
class ExpenseView {
  constructor() {
    this.balance = document.getElementById('balance');
    this.money_plus = document.getElementById('money-plus');
    this.money_minus = document.getElementById('money-minus');
    this.list = document.getElementById('list');
    this.form = document.getElementById('form');
    this.text = document.getElementById('text');
    this.amount = document.getElementById('amount');
  }

  addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';
  
    const item = document.createElement('li');
  
    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span> <button class="delete-btn" id="${transaction.id}">x</button>`;
  
    this.list.appendChild(item);
  }
  displayTransactions(transactions) {
    // Delete all nodes
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }
  
    // Show default message
    if (transactions.length === 0) {
      const p = this.createElement("p");
      p.textContent = "No transactions";
      this.list.append(p);
    } else {
      // Create nodes
      transactions.forEach(transaction => {
        this.addTransactionDOM(transaction);
      });
    }

    // Debugging
    console.log(transactions);
  }

  bindAddTransaction(handler) {
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      if (this.text) {
        handler(this.text.value, this.amount.value);
        this._resetInput();
      }
    });
  }

  bindRemoveTransaction(handler) {
    this.list.addEventListener("click", event => {

      if (event.target.className === "delete-btn") {
        const id = event.target.id;
      
        handler(id);
      }
    });
  }

  updateInfo(balance, income, expense){
    this.balance.innerText = balance;
    this.money_plus.innerText = income;
    this.money_minus.innerText = expense;
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  _resetInput() {
    this.text.value = "";
    this.amount.value ="";
  }

}
