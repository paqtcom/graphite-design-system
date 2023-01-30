import { Component, h, State, Element } from '@stencil/core';

@Component({
  tag: 'ts-stock-price',
  styleUrl: 'stock-price.scss',
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;

  @Element() el: HTMLElement;

  @State() fetchedPrice: number

  onFetchStockPrice(event: Event) {
    event.preventDefault();

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.stockInput.value}&apikey=1F8K7ZLX08UWRIGC`)
    .then(res => {
      return res.json();
    }).then(parsedRes => {
      this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return [
      <div>
        <form onSubmit={this.onFetchStockPrice.bind(this)}>
          <input ref={el => this.stockInput = el} />
          <button type="submit">Fetch</button>
        </form>
        <div>
          <p>Price: {this.fetchedPrice}</p>
        </div>
      </div>
    ];
  }
}