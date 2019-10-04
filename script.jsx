var Product = React.createClass({
  getInitialState: function(){
    return {qty: 0};
  },
  
  // Buy button on click adds 1 to the product quantity with this function
  // Additionally this function is used to pull the product price into calculateTotal function 
  buy: function() {
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
  },
  
  show: function(){
    this.props.handleShow(this.props.name);
  },
  
  render: function() {
    return (
      <div>
        <p>{this.props.name} - ${this.props.price}</p>
        <button onClick={this.buy}>BUY</button>
        <button onClick={this.show}>Show</button>
        <h3>Qty: {this.state.qty} item(s)</h3>
        <hr/>
      </div>
      );
  }
});

var Total = React.createClass({
  render: function() {
    return (
      <div>
      <h3>Total Cash:${this.props.total}</h3>
      </div>
      );
  }
});

var ProductForm = React.createClass({
  submit: function(e) {
    e.preventDefault();
    //alert('Name: ' + this.refs.name.value + '- $'+ this.refs.price.value);
    
    var product = {
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value)
    }
    
    this.props.handleCreate(product);
    
    this.refs.name.value = "";
    this.refs.price.value = "";
  },

render: function() {
  return (
    <form onSubmit = {this.submit}>
    <input type = "text" placeholder = "product name" ref = "name" /> -
    <input type = "text" placeholder = "product price" ref = "price" />
    <br/><br/>
    <button>Create Product</button>
    <hr/>
    </form>
    );
  }
});

var ProductList = React.createClass({
  getInitialState: function() {
    return {
      total: 0,
      productList: [
        {name: "Android", price: 121},
        {name: "Apple", price: 123},
        {name: "Nokia", price: 65}
        ]
    };
  },
  
  createProduct: function(product) {
    this.setState ({
      productList: this.state.productList.concat(product)
    })
  },
  
  calculateTotal: function(price) {
    this.setState({total: this.state.total + price});
    //alert(this.state.total);
  },
  
  showProduct: function(name) {
    alert("You selected " + name);
  },
  
  render: function() {
    var component = this;
    var products = this.state.productList.map(function(product) {
      return (
        <Product name= {product.name} price = {product.price} 
        handleShow={component.showProduct}
        handleTotal={component.calculateTotal}/>
        );
    });
    
    return (
      <div>
        <ProductForm handleCreate = {this.createProduct}/>
        {products}
        <Total total={this.state.total}/>
      </div>
      );
    }
});

React.render(<ProductList/>, document.getElementById("root"));


/*This block of code is no longer needed because the function above 
pulls information from the product list array!!!!!!!!!
  
  return(
    <div>
    <Product name="Android" price ={121} 
      handleShow={this.showProduct}
      handleTotal={this.calculateTotal}/>
    
    <Product name="Apple" price ={129}
      handleShow={this.showProduct}
      handleTotal={this.calculateTotal}/>
    
    <Product name="Nokia" price ={65}
      handleShow={this.showProduct}
      handleTotal={this.calculateTotal}/>
    
    <Total total={this.state.total}/>
    </div>
    );
  }
});*/

