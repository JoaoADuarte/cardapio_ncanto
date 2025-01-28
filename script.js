const menu = document.getElementById("menu");
const cartModal = document.getElementById("cart-modal");
const cartBtn = document.getElementById("cart-btn");
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closedMdalBtn = document.getElementById("closed-modal-btn");
const checkoutBtn = document.getElementById("checkout-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const trocoInput = document.getElementById("troco");
const trocoWarn = document.getElementById("troco-warn");
const obsInput = document.getElementById("Obs");
const paymentMethodSelect = document.getElementById("Pagamento"); // dropdown do pagamento
const valueCamp = document.getElementById("campoValor");
const valueInput = document.getElementById("valor");
const paymentwarn = document.getElementById("payment-warn");

let total = 0; // Variável global para o total
let trocoMessage = ""; // Variável global para a mensagem de troco
let cartItems = []; // Armazena todos os itens do carrinho
let selectedSize = null; // Armazena o tamanho do açaí selecionado
let selectedComplements = {}; // Armazena os complementos selecionados


function updateCartModal() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCounter = document.getElementById("cart-count");

    let total = 0;
    // Limpa o conteúdo atual do carrinho
    cartItemsContainer.innerHTML = "";

    // Itera sobre os itens do carrinho e os exibe
    cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item", "mb-4", "p-4", "border", "rounded");

        // Exibe o nome, preço e quantidade do item
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Quantidade: <button class="decrement-btn" data-id="${index}" data-name="${item.name}">-</button> ${item.quantity} <button class="increment-btn" data-id="${index}" data-name="${item.name}">+</button></p>
                    <p class="font-medium mt-2">R$ ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;


        let itemTotal = item.price * item.quantity;

        // Se for um açaí, exibe os complementos e adiciona seus valores ao total
        if (item.type === "acai" && item.complements && item.complements.length > 0) {
            cartItemElement.innerHTML += `<p class="mt-2 font-bold">Complementos:</p>`;
            item.complements.forEach(complement => {
                cartItemElement.innerHTML += `
                    <p>${complement.name} - Quantidade: ${complement.quantity}</p>
                `;
                // Adiciona o valor dos complementos ao total
                itemTotal += complement.price * complement.quantity;
            });
        }

        // Adiciona o valor do item principal ao total
        total += itemTotal;

        // Botão para remover o item do carrinho
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.classList.add("bg-red-500", "text-white", "px-2", "py-1", "rounded", "mt-2");
        removeButton.addEventListener("click", () => removeFromCart(item.name));

        cartItemElement.appendChild(removeButton);
        cartItemsContainer.appendChild(cartItemElement);
    });


    // Adiciona a taxa de entrega fixa ao total
    const deliveryFee = 2.00;
    const totalWithFee = total + deliveryFee;

    // Atualiza o total e o contador do carrinho
    cartTotal.textContent = totalWithFee.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    });
    cartCounter.textContent = cartItems.length;

    // Exibe mensagem se o carrinho estiver vazio
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p class='text-center'>Seu carrinho está vazio.</p>";
        cartTotal.textContent = deliveryFee.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        }); // Exibe apenas a taxa de entrega
    }
}



// Função para adicionar item ao carrinho
function addToCart(name, price) {
    const newItem = {
      name: name,
      price: price,
      quantity: 1
    };
    cartItems.push(newItem);
    updateCartModal(); // Atualiza a interface do carrinho
  }
  
 // Função para atualizar a quantidade no menu principal
function updateMenuQuantity(name, quantity) {
    const menuItem = document.querySelector(`.menu-item[data-name="${name}"]`);
    if (menuItem) {
        const quantityElement = menuItem.querySelector(".item-quantity");
        if (quantityElement) {
            quantityElement.textContent = quantity;
        }
    }
} 
// Função para remover item do carrinho e atualizar o menu principal
function removeFromCart(name) {
    const itemIndex = cartItems.findIndex((item) => item.name === name);
    if (itemIndex !== -1) {
        const item = cartItems[itemIndex];
        if (item.quantity > 1) {
            item.quantity -= 1; // Diminui a quantidade no carrinho
        } else {
            cartItems.splice(itemIndex, 1); // Remove o item se a quantidade for 1
        }

        // Atualiza a quantidade no menu principal
        updateMenuQuantity(name, item.quantity);

        updateCartModal(); // Atualiza o modal do carrinho
        console.log(`Item removido: ${name}`);
    }
}



  // Evento de clique para adicionar item ao carrinho
  menu.addEventListener("click", function(event) {
    let addToCartButton = event.target.closest(".add-to-cart-btn"); // Ajustar a classe do botão
    if (addToCartButton) {
      const name = addToCartButton.getAttribute("data-name");
      const price = parseFloat(addToCartButton.getAttribute("data-price"));
      addToCart(name, price);
    }
  });

// Função para aumentar a quantidade
function increaseCount(id, button) {
    console.log(`Aumentando quantidade no button: ${id}`);
    const countElement = document.getElementById(id);
    let currentCount = parseInt(countElement.textContent);
    countElement.textContent = currentCount + 1;

    // Captura os dados do botão +
    const itemName = button.getAttribute("data-name");
    const itemPrice = parseFloat(button.getAttribute("data-price"));

    console.log(`Dados capturados - Nome: ${itemName}, Preço: ${itemPrice}`);
    addToCart(itemName, itemPrice);
}

// Função para diminuir a quantidade
function decreaseCount(id, button) {
    console.log(`Diminuindo quantidade: ${id}`);
    const countElement = document.getElementById(id);
    let currentCount = parseInt(countElement.textContent);

    if (currentCount > 0) {
        countElement.textContent = currentCount - 1;

        // Captura os dados do botão -
        const itemName = button.getAttribute("data-name");
        removeFromCart(itemName); // Remove o item do carrinho
    }
}

// Evento de clique para os botões de incremento e decremento
menu.addEventListener('click', function(event) {
    let incrementButton = event.target.closest(".increment-btn");
    let decrementButton = event.target.closest(".decrement-btn");


    if (incrementButton) {
        const id = incrementButton.getAttribute("data-id");
        console.log(`Increment button clicked - ID: ${id}`);
        increaseCount(id, incrementButton);
    }

    if (decrementButton) {
        const id = decrementButton.getAttribute("data-id");
        console.log(`Decrement button clicked - ID: ${id}`);
        decreaseCount(id, decrementButton);
    }
});

// Função para calcular o troco
function calcularTroco() {
    const valorPago = parseFloat(valueInput.value.replace(/[^\d,]/g, "").replace(",", "."));
    const troco = valorPago - total;

    if (!isNaN(troco) && troco >= 0) {
        trocoMessage = `%0ATroco: R$ ${troco.toFixed(2)}`;
    } else {
        trocoMessage = "%0ATroco: Valor insuficiente";
    } 
}

// abre o Modal do carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex";
})

// Fechar Modal clique fora
cartModal.addEventListener("click", function(event) {
    if(event.target === cartModal) {
        cartModal.style.display = "none";
    }
})

closedMdalBtn.addEventListener("click", function() {
    cartModal.style.display = "none";
})

//--------------------------TROCO e Finalização do Pedido--------------------------------------------

// Função para verificar o valor do troco e exibir/esconder o aviso se necessário
function verificarValorTroco() {
    const valorPago = parseFloat(valueInput.value.replace(/[^\d,]/g, "").replace(",", "."));

    if (paymentMethodSelect.value === "Dinheiro" && (isNaN(valorPago) || valorPago < total)) {
        trocoWarn.classList.remove("hidden");
        valueInput.classList.add("border-red-500");
    } else {
        trocoWarn.classList.add("hidden");
        valueInput.classList.remove("border-red-500");
    }
}


// Atualiza o campo de valor ao digitar
valueInput.addEventListener("input", verificarValorTroco);

// Função para verificar a opção de pagamento e exibir/esconder o campo de valor
function verificarOpcao() {
    if (paymentMethodSelect.value === "_blank") {
        paymentwarn.classList.remove("hidden");
        paymentMethodSelect.classList.add("border-red-500");
    } else {
        paymentwarn.classList.add("hidden");
        paymentMethodSelect.classList.remove("border-red-500");
    }

    // Exibe o campo de valor apenas quando a opção "Dinheiro" é selecionada
    if (paymentMethodSelect.value === "Dinheiro") {
        valueCamp.style.display = "block";
    } else {
        valueCamp.style.display = "none";
        trocoWarn.classList.add("hidden"); // Oculta o aviso de troco se a opção não for "Dinheiro"
        valueInput.classList.remove("border-red-500");
    }
}

// Adiciona o listener ao dropdown para executar a verificação
paymentMethodSelect.addEventListener("change", verificarOpcao);

// Função para verificar o endereço
function verificarEndereco() {
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return false; // Endereço inválido
    } else {
        addressWarn.classList.add("hidden");
        addressInput.classList.remove("border-red-500");
        return true; // Endereço válido
    }
}

// Event listener para o campo de endereço
addressInput.addEventListener("input", function() {
    if (addressInput.value !== "") {
        addressWarn.classList.add("hidden");
        addressInput.classList.remove("border-red-500");
    }
});

// Função para calcular o troco se a forma de pagamento for dinheiro e o valor for suficiente
checkoutBtn.addEventListener("click", function () {
    // Verifica se o carrinho está vazio
    if (cartItems.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.");
        return;
    }

    // Verifica o endereço
    if (!verificarEndereco()) {
        return; // Interrompe se o endereço for inválido
    }

    // Verifica o método de pagamento
    if (paymentMethodSelect.value === "_blank") {
        paymentwarn.classList.remove("hidden");
        paymentMethodSelect.classList.add("border-red-500");
        return; // Interrompe se o método de pagamento não for selecionado
    }

    // Verifica o valor do troco (se o pagamento for em dinheiro)
    if (paymentMethodSelect.value === "Dinheiro") {
        const valorPago = parseFloat(valueInput.value.replace(/[^\d,]/g, "").replace(",", "."));
        if (isNaN(valorPago) || valorPago < total) {
            trocoWarn.classList.remove("hidden");
            valueInput.classList.add("border-red-500");
            return; // Interrompe se o valor for insuficiente
        }
    }

    // Recalcula o total antes de enviar a mensagem
    let totalPedido = 0;
    cartItems.forEach((item) => {
        let itemTotal = item.price * item.quantity;
        if (item.type === "acai" && item.complements && item.complements.length > 0) {
            item.complements.forEach((complement) => {
                itemTotal += complement.price * complement.quantity;
            });
        }
        totalPedido += itemTotal;
    });

    // Adiciona a taxa de entrega ao total
    const deliveryFee = 2.0; // Taxa de entrega fixa
    totalPedido += deliveryFee;

    // Gera a mensagem do pedido
    const cartItemsText = cartItems
        .map((item) => {
            let itemText = `${item.name} - Quantidade: ${item.quantity}`;
            if (item.type === "acai" && item.complements && item.complements.length > 0) {
                itemText += "\n  Complementos:";
                item.complements.forEach((complement) => {
                    itemText += `\n    ${complement.name} - Quantidade: ${complement.quantity}`;
                });
            }
            return itemText;
        })
        .join("\n");

    // Adiciona o troco à mensagem (se aplicável)
    let trocoMessage = "";
    if (paymentMethodSelect.value === "Dinheiro") {
        const valorPago = parseFloat(valueInput.value.replace(/[^\d,]/g, "").replace(",", "."));
        const troco = valorPago - totalPedido;
        trocoMessage = `\nTroco: R$ ${troco.toFixed(2)}`;
    }

    // Monta a mensagem completa
    const message = encodeURIComponent(
        `Pedido:\n${cartItemsText}\n\n` +
            `Endereço: ${addressInput.value}\n` +
            `Forma de pagamento: ${paymentMethodSelect.value}\n` +
            `Obs: ${obsInput.value || "Nenhuma"}\n` +
            `Total do pedido: R$ ${totalPedido.toFixed(2)}` +
            trocoMessage
    );

    // Abre o WhatsApp com a mensagem
    const phone = "5533988538798"; // Substitua pelo número correto
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    // Limpa o carrinho após finalizar o pedido
    cartItems = [];
    updateCartModal();
});
//-------------------------------------------------Horário de abertura-------------------------------------------------
function checkRestaurantOpen() {
    const data = new Date();
    const dia = data.getDay();
    const hora = data.getHours();

    return dia >= 1 && dia <= 5 && hora >= 14 && hora < 18;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if(isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}
//-------------------------------------------------Container fixo das abas-------------------------------------------------
  document.addEventListener('DOMContentLoaded', function() {
    const tabsContainer = document.getElementById('tabs-container');
    const stickyOffset = tabsContainer.offsetTop;

    window.addEventListener('scroll', function() {
      if (window.pageYOffset > stickyOffset) {
        tabsContainer.classList.add('fixed', 'top-0', 'left-0', 'right-0');
      } else {
        tabsContainer.classList.remove('fixed', 'top-0', 'left-0', 'right-0');
      }
    });
  });

  //
  document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
  
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });

// -------------------------------------------------AÇAÍ FUNCTION-------------------------------------------------

// Função para selecionar o tamanho do açaí
function togglePressed(button) {
    // Remove a classe "pressed" de todos os botões de tamanho
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white');
    });

    // Adiciona a classe "pressed" ao botão clicado
    button.classList.add('bg-purple-600', 'text-white');

    // Armazena o tamanho e o preço selecionados
    selectedSize = {
        size: button.getAttribute('data-size'),
        price: parseFloat(button.getAttribute('data-price'))
    };

    // Mostra a seção de complementos
    document.getElementById('complementos-section').classList.remove('hidden');
}


// Função para selecionar o tamanho do açaí
function selectSize(button) {
    selectedSize = {
        size: button.getAttribute("data-size"),
        price: parseFloat(button.getAttribute("data-price")),
    };
    document.getElementById('complementos-section').classList.remove('hidden');
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white');
    });
    button.classList.add('bg-purple-600', 'text-white');
}

// Função para ajustar a quantidade de complementos
function adjustComplementQuantity(button) {
    const complementId = button.getAttribute('data-id');
    const complementName = button.getAttribute('data-name');
    const complementPrice = parseFloat(button.getAttribute('data-price'));
    const quantityElement = document.getElementById(complementId);
    let quantity = parseInt(quantityElement.textContent);

    if (button.classList.contains('increment-acai-btn')) {
        quantity += 1;
    } else if (button.classList.contains('decrement-acai-btn') && quantity > 0) {
        quantity -= 1;
    }

    quantityElement.textContent = quantity;

    // Atualiza os complementos selecionados
    if (quantity > 0) {
        selectedComplements[complementName] = {
            price: complementPrice,
            quantity: quantity,
        };
    } else {
        delete selectedComplements[complementName];
    }
}

// Função para adicionar açaí e complementos ao carrinho
function addacaiToOrder() {
    if (!selectedSize) {
        alert('Selecione um tamanho de açaí antes de adicionar ao carrinho.');
        return;
    }

    // Cria um objeto para o açaí com seus complementos
    const acaiItem = {
        type: "acai",
        name: `Açaí ${selectedSize.size}`,
        price: selectedSize.price,
        quantity: 1,
        complements: [], // Lista de complementos
    };

    // Adiciona os complementos ao objeto do açaí
    for (const [name, details] of Object.entries(selectedComplements)) {
        if (details.quantity > 0) {
            acaiItem.complements.push({
                name: name,
                price: details.price,
                quantity: details.quantity,
            });
        }
    }

    // Adiciona o açaí (com complementos) ao carrinho
    cartItems.push(acaiItem);

    // Limpa as seleções temporárias
    selectedSize = null;
    selectedComplements = {};
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white');
    });
    document.getElementById('complementos-section').classList.add('hidden');
    document.querySelectorAll('.increment-acai-btn, .decrement-acai-btn').forEach(btn => {
        const quantityElement = document.getElementById(btn.getAttribute('data-id'));
        quantityElement.textContent = 0;
    });

    updateCartUI(); // Atualiza a interface do carrinho
    alert('Açaí adicionado ao carrinho!');
}

// Função para atualizar a interface do carrinho
function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  // Limpa o conteúdo atual do carrinho
  cartItemsContainer.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  // Itera sobre os itens do carrinho e os exibe
  cartItems.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item", "mb-4", "p-4", "border", "rounded");

    // Exibe o nome, preço e quantidade do item
    itemElement.innerHTML = `
        <p class="font-bold">${item.name} - R$ ${item.price.toFixed(2)}</p>
        <p>Quantidade: ${item.quantity}</p>
      `;

    // Se for um açaí, exibe os complementos
    if (item.type === "acai" && item.complements.length > 0) {
      itemElement.innerHTML += `<p class="mt-2 font-bold">Complementos:</p>`;
      item.complements.forEach(complement => {
        itemElement.innerHTML += `
            <p>${complement.name} - Quantidade: ${complement.quantity}</p>
          `;
      });
    }

    // Botão para remover o item do carrinho
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.classList.add("bg-red-500", "text-white", "px-2", "py-1", "rounded", "mt-2");
    removeButton.addEventListener("click", () => removeItemFromCart(index));

    itemElement.appendChild(removeButton);
    cartItemsContainer.appendChild(itemElement);

    // Atualiza o total e a contagem de itens
    total += item.price * item.quantity;
    itemCount += item.quantity;
  });

  // Atualiza o total e o contador do carrinho
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = itemCount;
}

// Função para remover um item do carrinho
function removeItemFromCart(index) {
  cartItems.splice(index, 1); // Remove o item do array
  let total = 0; // Reset total before recalculating

  cartItems.forEach(item => {
    let itemTotal = item.price * item.quantity;
    if (item.type === "acai" && item.complements.length > 0) {
      item.complements.forEach(complement => {
        itemTotal += complement.price * complement.quantity;
      });
    }
    total += itemTotal; // Add item total to overall total
  });

  cartTotal.textContent = 'R$ ${total.toFixed(2)}';
  updateCartModal();
}

// Evento de clique para adicionar ou remover item do carrinho
// Adicionar item
menu.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".add-to-cart-btn");
    if(parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        // ADD Carrinho
        addToCart(name, price);
    }
})

// Evento de clique para remover item do carrinho no modal
cartItemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        const name = event.target.getAttribute('data-name');
        removeFromCart(name);
    }
});

// Removedor visível
function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if(index !== -1) {
        const item = cart[index];

        if(item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}

// Evento de clique para ajustar a quantidade de complementos
document.getElementById('complementos-section').addEventListener('click', function(event) {
    if (event.target.classList.contains('increment-acai-btn') || event.target.classList.contains('decrement-acai-btn')) {
        adjustComplementQuantity(event.target);
    }
});

// Evento para abrir/fechar o modal do carrinho
document.getElementById('cart-btn').addEventListener('click', function() {
    document.getElementById('cart-modal').classList.remove('hidden');
});

document.getElementById('closed-modal-btn').addEventListener('click', function() {
    document.getElementById('cart-modal').classList.add('hidden');
});