
class CartItem{
    constructor(name,Price,ItemCode){
        this.name = name;
        this.Price = Price;
        this.ItemCode = ItemCode;
    }
}

class UI {
    static displayItems(){
       
        const Storeditems = Storage.getItems();
        const items = Storeditems;
        items.forEach((item)=> UI.addItemToCart(item))
    }
    static addItemToCart(item){
        const cart = document.querySelector('#cart-list');
        const row = document.createElement('tr');
        row.innerHTML=`<td>${item.name}</td>
                        <td>${item.Price}</td>
                        <td>${item.ItemCode}</td>
                        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        cart.appendChild(row);
    }

     static DeleteItem(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }
    static Validator(message, className){
        const div = document.createElement('div');
        const container = document.querySelector(".container");
        const form = document.querySelector('#cart-form');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div,form);   
    }
    static clearInput(){
        document.querySelector('#Item').value = '';
        document.querySelector('#Price').value = '';
        document.querySelector('#ItemCode').value = '';
    }
   
}

class Storage{
    
    static getItems(){
        let items;
        if(localStorage.getItem('Item')===null){
            items = [];
        }else{
            items = JSON.parse(localStorage.getItem('Item'));
        }
        return items;
    }
    static addItem(item){
        const items = Storage.getItems();
        items.push(item);
        localStorage.setItem('Item', JSON.stringify(items));
    }
    static removeItem(ItemCode){
        const items = Storage.getItems();
        items.forEach((item, index)=>{
            if(item.ItemCode == ItemCode){
            items.splice(index,1);
            }
        });
        localStorage.setItem('Item', JSON.stringify(items));

    }
}


document.addEventListener('DOMContentLoaded', UI.displayItems);

document.querySelector('#cart-form').addEventListener('submit', (e)=>{
    e.preventDefault();

    const itemName = document.querySelector('#Item').value;
    const Price = document.querySelector('#Price').value;
    const ItemCode = document.querySelector('#ItemCode').value;

    if(itemName==='' || Price===''|| ItemCode===''){
        UI.Validator('Invalid Inputs', 'alert-danger')
        setTimeout(() => {
            document.querySelector('.alert-danger').remove();
        }, 3000);;
    }else{
        const cartitem = new CartItem(itemName, Price, ItemCode);
    console.log(cartitem);
    UI.addItemToCart(cartitem);
    Storage.addItem(cartitem);

    UI.clearInput();
    UI.Validator('Item Added to cart', 'alert-success');
    setTimeout(() => {
            document.querySelector('.alert-success').remove();
        }, 3000);
    }
    
    });

document.querySelector('#cart-list').addEventListener('click', (e)=>{
    UI.DeleteItem(e.target);
    Storage.removeItem(e.target.parentElement.previousElementSibling.textContent);
    UI.Validator('Item removed from cart', 'alert-warning');
    setTimeout(() => {
            document.querySelector('.alert-warning').remove();
        }, 3000);
    }
);