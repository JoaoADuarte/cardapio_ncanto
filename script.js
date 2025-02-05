const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const closedMdalBtn = document.getElementById("closed-modal-btn")
const checkoutBtn = document.getElementById("checkout-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")
const trocoInput = document.getElementById("troco")
const trocoWarn = document.getElementById("troco-warn")
const obsInput = document.getElementById("Obs")
const paymentMethodSelect = document.getElementById("Pagamento") // dropdown do pagamento
const valueCamp = document.getElementById("campoValor")
const valueInput = document.getElementById("valor")
const paymentwarn = document.getElementById("payment-warn")


let total = 0; // Variável global para o total
let trocoMessage = ""; // Variável global para a mensagem de troco

let selectedSize = null; // Armazena o tamanho do açaí selecionado
let selectedComplements = {}; // Armazena os complementos selecionados

const deliveryFee = 2.00; // Taxa de entrega fixa


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

  //----------------------------------Banner---------------------------------
  document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.getElementById("carousel");
    const images = Array.from(carousel.children);
    let currentIndex = 0;
    const totalImages = images.length;

    // Inicializa as posições das imagens
    images.forEach((image, index) => {
        image.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
    });

    function moveToNextImage() {
        // Atualiza o índice da imagem atual
        currentIndex = (currentIndex + 1) % totalImages;

        // Aplica a transição para mover todas as imagens
        images.forEach((image, index) => {
            image.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
        });
    }

    // Inicia o timer para mover a imagem após 3 segundos
    setInterval(moveToNextImage, 3000);
});
//----------------------------------Menu---------------------------------


// Função para atualizar o modal do carrinho
function updateCartModal() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    console.log("Atualizando modal do carrinho. Itens no carrinho:", cart);

    let totalCartValue = 0;

    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("flex", "justify-between", "items-center", "mb-4", "p-4", "border", "rounded-lg", "shadow-sm");

        let totalItemValue = 0;

        if (item.type === "acai" || item.type === "salgado") {
            totalItemValue = (item.price * item.quantity) + (item.complements || []).reduce((sum, complement) => sum + (complement.price * complement.quantity), 0);

            itemElement.innerHTML = `
                <div class="flex flex-col">
                    <span class="font-bold">${item.name}</span>
                    <div class="complements ml-4 mt-2">
                        ${(item.complements || []).map(complement => `
                            <div class="complement-item text-sm">
                                <span>${complement.name} x ${complement.quantity}</span>
                                <span>${(complement.price * complement.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                            </div>
                        `).join('')}
                    </div>
                    <span class="text-sm">Quantidade: ${item.quantity}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-bold">${totalItemValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                    <button 
                        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 remove-btn" 
                        data-id="${item.id}"
                    >
                        Remover
                    </button>
                    <button 
                        class="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 decrement-cart-btn" 
                        data-id="${item.id}"
                    >
                        -
                    </button>
                    <button 
                        class="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 increment-cart-btn" 
                        data-id="${item.id}"
                    >
                        +
                    </button>
                </div>
            `;
        } else if (item.type === "pao") {
            totalItemValue = (item.price * item.quantity) + (item.additionals || []).reduce((sum, additional) => sum + (additional.price * additional.quantity), 0);

            itemElement.innerHTML = `
                <div class="flex flex-col">
                    <span class="font-bold">${item.name}</span>
                    <div class="additionals ml-4 mt-2">
                        ${(item.additionals || []).map(additional => `
                            <div class="additional-item text-sm">
                                <span>${additional.name} x ${additional.quantity}</span>
                                <span>${(additional.price * additional.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                            </div>
                        `).join('')}
                    </div>
                    <span class="text-sm">Quantidade: ${item.quantity}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-bold">${totalItemValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                    <button 
                        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 remove-btn" 
                        data-id="${item.id}"
                    >
                        Remover
                    </button>
                    <button 
                        class="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 decrement-cart-btn" 
                        data-id="${item.id}"
                    >
                        -
                    </button>
                    <button 
                        class="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 increment-cart-btn" 
                        data-id="${item.id}"
                    >
                        +
                    </button>
                </div>
            `;
        } else {
            totalItemValue = item.price * item.quantity;

            itemElement.innerHTML = `
                <div class="flex flex-col">
                    <span class="font-bold">${item.name}</span>
                    <span class="text-sm">Quantidade: ${item.quantity}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-bold">${totalItemValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                    <button 
                        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 remove-btn" 
                        data-id="${item.id}"
                    >
                        Remover
                    </button>
                    <button 
                        class="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 decrement-cart-btn" 
                        data-id="${item.id}"
                    >
                        -
                    </button>
                    <button 
                        class="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 increment-cart-btn" 
                        data-id="${item.id}"
                    >
                        +
                    </button>
                </div>
            `;
        }

        totalCartValue += totalItemValue;
        cartItemsContainer.appendChild(itemElement);
    });
    totalCartValue += deliveryFee; // Adiciona a taxa de entrega ao total

    const totalCartElement = document.getElementById("cart-total");
    if (totalCartElement) {
        totalCartElement.textContent = totalCartValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    // Adiciona eventos de remoção, incremento e decremento
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => {
            const itemId = button.getAttribute("data-id");
            removeItemCompletely(itemId);
        });
    });

    document.querySelectorAll(".decrement-cart-btn").forEach(button => {
        button.addEventListener("click", () => {
            const itemId = button.getAttribute("data-id");
            const item = cart.find(item => item.id === itemId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    // Ajusta a quantidade dos adicionais/complementos
                    if (item.complements) {
                        item.complements.forEach(complement => {
                            if (complement.quantity > 1) {
                                complement.quantity -= 1;
                            }
                        });
                    }
                    if (item.additionals) {
                        item.additionals.forEach(additional => {
                            if (additional.quantity > 1) {
                                additional.quantity -= 1;
                            }
                        });
                    }
                } else {
                    removeItemCompletely(itemId);
                }
                updateCartModal();
            }
        });
    });

    document.querySelectorAll(".increment-cart-btn").forEach(button => {
        button.addEventListener("click", () => {
            const itemId = button.getAttribute("data-id");
            const item = cart.find(item => item.id === itemId);
            if (item) {
                item.quantity += 1;
                // Ajusta a quantidade dos adicionais/complementos
                if (item.complements) {
                    item.complements.forEach(complement => {
                        complement.quantity += 1;
                    });
                }
                if (item.additionals) {
                    item.additionals.forEach(additional => {
                        additional.quantity += 1;
                    });
                }
                updateCartModal();
            }
        });
    });
}

// Função para abrir/fechar o modal do carrinho
const cartModal = document.getElementById("cart-modal");
const openCartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("closed-modal-btn");

openCartBtn.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
    updateCartModal(); // Atualiza o modal ao abrir
});

closeCartBtn.addEventListener("click", () => {
    cartModal.classList.add("hidden");
});

// Função para adicionar itens ao carrinho
document.querySelectorAll(".increment-btn").forEach(button => {
    button.addEventListener("click", () => {
        const itemId = button.getAttribute("data-id");
        const itemName = button.getAttribute("data-name");
        const itemPrice = parseFloat(button.getAttribute("data-price"));
        addToCart(itemId, itemName, itemPrice);
    });
});

// Função para remover itens do carrinho
document.querySelectorAll(".decrement-btn").forEach(button => {
    button.addEventListener("click", () => {
        const itemId = button.getAttribute("data-id");
        removeFromCart(itemId);
    });
});

let cart = []; // Array para armazenar os itens do carrinho
// Função para adicionar um item ao carrinho
function addToCart(itemId, itemName, itemPrice) {
    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
    }

    console.log("Item adicionado ao carrinho:", { id: itemId, name: itemName, price: itemPrice, quantity: 1 });
    console.log("Carrinho atual:", cart);
    console.log("Tamanho do carrinho:", cart.length);

    updateCartCount();
    updateCartModal(); // Atualiza o modal ao adicionar um item
    updateMenuCounter(itemId, existingItem ? existingItem.quantity : 1);
    calculateTotal();
}

// Função para remover um item do carrinho
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    updateCartCount();
    updateCartModal(); // Atualiza o modal ao remover um item
    updateMenuCounter(itemId, cart[itemIndex] ? cart[itemIndex].quantity : 0);
    calculateTotal();
}


// Função para atualizar o contador do carrinho
function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = cartCount;
}

// Função para atualizar o contador no menu
function updateMenuCounter(itemId, quantity) {
    const menuCounter = document.getElementById(itemId);
    if (menuCounter) {
        menuCounter.textContent = quantity;
    }
}
// Função para remover completamente um item do carrinho
function removeItemCompletely(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    }

    updateCartCount();
    updateCartModal(); // Atualiza o modal ao remover completamente
    updateMenuCounter(itemId, 0);
    calculateTotal();
}



// Função para validar o formulário antes de finalizar o pedido
 document.getElementById("checkout-btn").addEventListener("click", () => {
    const address = document.getElementById("address").value.trim();
    const paymentMethod = document.getElementById("Pagamento").value;
    const troco = document.getElementById("valor").value.trim();

    let isValid = true;

    if (!address) {
        document.getElementById("address-warn").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("address-warn").classList.add("hidden");
    }

    if (paymentMethod === "_blank") {
        document.getElementById("payment-warn").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("payment-warn").classList.add("hidden");
    }

    if (paymentMethod === "Dinheiro" && (!troco || parseFloat(troco.replace(/\D/g, "")) < total)) {
        document.getElementById("troco-warn").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("troco-warn").classList.add("hidden");
    }

    if (isValid) {
        updateCartCount();
        updateCartModal(); // Atualiza o modal ao finalizar o pedido
        calculateTotal();
        cartModal.classList.add("hidden");
    }
});

function calculateTotal() {
    let total = cart.reduce((sum, item) => {
        let itemTotal = item.price * item.quantity;

        // Adiciona o preço dos complementos (açaí e salgados)
        if (item.type === "acai" && item.complements && item.complements.length > 0) {
            itemTotal += item.complements.reduce((sum, complement) => sum + (complement.price * complement.quantity), 0);
        }

        // Adiciona o preço dos adicionais (pães)
        if (item.type === "pao" && item.additionals && item.additionals.length > 0) {
            itemTotal += item.additionals.reduce((sum, additional) => sum + (additional.price * additional.quantity), 0);
        }

        return sum + itemTotal;
    }, 0);

    // Adiciona a taxa de entrega ao total
    total += deliveryFee;

    return total;
}



//--------------------------Paes--------------------------------------------
// Variáveis globais específicas para os pães
let selectedPao = null;
let selectedPaoAdditionals = {};


function selectPao(button) {
    // Remove a classe "pressed" de todos os botões de pão
    document.querySelectorAll('.size-btn-pao').forEach(btn => {
        btn.classList.remove('bg-green-800', 'text-white'); // Remove o estilo "pressed"
        btn.classList.add('bg-white', 'text-black'); // Restaura o estilo padrão
    });

    // Adiciona a classe "pressed" ao botão clicado
    button.classList.remove('bg-white', 'text-black'); // Remove o estilo padrão
    button.classList.add('bg-green-800', 'text-white'); // Aplica o estilo "pressed"

    // Armazena o tipo e o preço selecionados
    selectedPao = {
        type: button.getAttribute('data-size'),
        price: parseFloat(button.getAttribute('data-price'))
    };

    // Mostra a seção de adicionais dos pães
    const adicionaisSection = document.getElementById('adicionais-section');
    adicionaisSection.classList.remove('hidden');

    // Rola a página até a seção de adicionais com um deslocamento personalizado
    const offset = 60; // Ajuste este valor conforme necessário (altura do elemento fixo)
    const elementPosition = adicionaisSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}


// Função para ajustar a quantidade de adicionais dos pães
function adjustPaoAdditionalQuantity(button) {
    const additionalId = button.getAttribute('data-id');
    const additionalName = button.getAttribute('data-name');
    const additionalPrice = parseFloat(button.getAttribute('data-price'));
    const quantityElement = document.getElementById(additionalId);
    let quantity = parseInt(quantityElement.textContent);

    if (button.classList.contains('increment-btn-pao')) {
        quantity += 1;
    } else if (button.classList.contains('decrement-btn-pao') && quantity > 0) {
        quantity -= 1;
    }

    quantityElement.textContent = quantity;

    // Atualiza os adicionais selecionados
    if (quantity > 0) {
        selectedPaoAdditionals[additionalName] = {
            name: additionalName,
            price: additionalPrice,
            quantity: quantity
        };
    } else {
        delete selectedPaoAdditionals[additionalName];
    }

    updateCartModal();
}

// Função para adicionar pão e adicionais ao carrinho
function addPaoToOrder() {
    if (!selectedPao) {
        alert('Selecione um tipo de pão antes de adicionar ao carrinho.');
        return;
    }

    const paoItem = {
        type: "pao",
        id: `pao-${selectedPao.type}-${Date.now()}`, // ID único para o item
        name: selectedPao.type,
        price: selectedPao.price,
        quantity: 1,
        additionals: Object.entries(selectedPaoAdditionals)
            .filter(([_, details]) => details.quantity > 0)
            .map(([name, details]) => ({
                name: name,
                price: details.price,
                quantity: details.quantity,
            })),
    };

    // Adiciona o pão ao carrinho
    cart.push(paoItem);
    // Atualiza o carrinho
    updateCartCount();
    updateCartModal();
    calculateTotal();

    // Limpa as seleções temporárias
    selectedPao = null;
    selectedPaoAdditionals = {};
    document.querySelectorAll('.size-btn-pao').forEach(btn => btn.classList.remove('bg-purple-600', 'text-white'));
    document.getElementById('adicionais-section').classList.add('hidden');
    document.querySelectorAll('.increment-btn-pao, .decrement-btn-pao').forEach(btn => {
        const quantityElement = document.getElementById(btn.getAttribute('data-id'));
        quantityElement.textContent = 0;
    });

    alert('Pão adicionado ao carrinho!');
}



function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => { 
        const itemElement = document.createElement("div");
        itemElement.classList.add("flex", "justify-between", "items-center", "mb-2");

        const itemName = document.createElement("span");
        itemName.textContent = `${item.name} (R$ ${item.price.toFixed(2)})`;
        itemElement.appendChild(itemName);

        if (item.additionals && item.additionals.length > 0) {
            const additionalsList = document.createElement("ul");
            additionalsList.classList.add("list-disc", "pl-4");

            item.additionals.forEach(additional => {
                const additionalItem = document.createElement("li");
                additionalItem.textContent = `${additional.name} (R$ ${additional.price.toFixed(2)}) x ${additional.quantity}`;
                additionalsList.appendChild(additionalItem);

                total += additional.price * additional.quantity;
            });

            itemElement.appendChild(additionalsList);
        }

        const itemTotal = item.price + item.additionals.reduce((sum, add) => sum + add.price * add.quantity, 0);
        total += itemTotal;

        const itemPrice = document.createElement("span");
        itemPrice.textContent = `R$ ${itemTotal.toFixed(2)}`;
        itemElement.appendChild(itemPrice);

        cartItemsContainer.appendChild(itemElement);
        itemCount += item.quantity;
    });

    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    cartCount.textContent = itemCount;
}

function calculatePaoTotal() {
    let total = 0;

    paoCart.forEach(item => {
        total += item.price;

        if (item.additionals && item.additionals.length > 0) {
            item.additionals.forEach(additional => {
                total += additional.price * additional.quantity;
            });
        }
    });

    return total;
}
//--------------------------Açaí--------------------------------------------
// Função para selecionar o tamanho do açaí
function togglePressed(button) {
    // Remove a classe "pressed" de todos os botões de tamanho
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white');
        btn.classList.add('bg-white', 'text-black'); // Restaura o estado padrão
    });

    // Adiciona a classe "pressed" ao botão clicado
    button.classList.remove('bg-white', 'text-black'); // Remove o estado padrão
    button.classList.add('bg-purple-600', 'text-white'); // Aplica o estado "pressed"

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
    // Remove a classe "pressed" de todos os botões de tamanho
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('bg-purple-600', 'text-white'));
    // Adiciona a classe "pressed" ao botão clicado
    button.classList.add('bg-purple-600', 'text-white');
    // Armazena o tamanho e o preço selecionados
    selectedSize = {
        size: button.getAttribute("data-size"),
        price: parseFloat(button.getAttribute("data-price")),
    };
    // Mostra a seção de complementos
    document.getElementById('complementos-section').classList.remove('hidden');
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
    const acaiItem = { // Corrigido 'constacaiItem' para 'const acaiItem'
        type: "acai",
        id: `acai-${selectedSize.size}-${Date.now()}`, // ID único para o item
        name: `Açaí ${selectedSize.size}`,
        price: selectedSize.price,
        quantity: 1,
        complements: Object.entries(selectedComplements)
            .filter(([_, details]) => details.quantity > 0)
            .map(([name, details]) => ({
                name: name,
                price: details.price,
                quantity: details.quantity,
            })),
    };
    // Adiciona o açaí ao carrinho
    cart.push(acaiItem); 
    // Atualiza o carrinho
    updateCartCount(); 
    updateCartModal(); 
    calculateTotal(); 
    // Limpa as seleções temporárias
    selectedSize = null;
    selectedComplements = {};
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('bg-purple-600', 'text-white'));
    document.getElementById('complementos-section').classList.add('hidden');
    document.querySelectorAll('.increment-acai-btn, .decrement-acai-btn').forEach(btn => {
        const quantityElement = document.getElementById(btn.getAttribute('data-id'));
        quantityElement.textContent = 0;
    });
    alert('Açaí adicionado ao carrinho!');
}


function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    // Limpa o conteúdo atual do carrinho
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let itemCount = 0;

    // Itera sobre os itens do carrinho e os exibe
    cart.forEach((item, index) => {
        const { element, total: itemTotal } = renderCartItem(item, index);
        cartItemsContainer.appendChild(element);
        total += itemTotal;
        itemCount += item.quantity;
    });

    // Atualiza o total e o contador do carrinho
    cartTotal.textContent = 'R$ ' + total.toFixed(2);
    cartCount.textContent = itemCount;

    // Adiciona eventos de clique para os botões de incremento e decremento
    const incrementBtns = cartItemsContainer.querySelectorAll('.increment-btn');
    const decrementBtns = cartItemsContainer.querySelectorAll('.decrement-btn');

    incrementBtns.forEach(btn => {
        btn.addEventListener('click', () => incrementCartItem(parseInt(btn.getAttribute('data-index'))));
    });

    decrementBtns.forEach(btn => {
        btn.addEventListener('click', () => decrementCartItem(parseInt(btn.getAttribute('data-index'))));
    });
}

// Função para remover item do carrinho
function removeItemFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCartUI();
    }
}
// Vincular eventos aos botões de tamanho do açaí
document.querySelectorAll('.size-btn').forEach(button => {
    button.addEventListener('click', () => selectSize(button));
});

// Vincular eventos aos botões de incremento e decremento dos complementos
document.querySelectorAll('.increment-acai-btn, .decrement-acai-btn').forEach(button => {
    button.addEventListener('click', () => adjustComplementQuantity(button));
});

/*// Vincular evento ao botão de adicionar ao carrinho
document.getElementById('add-acai-btn').addEventListener('click', addacaiToOrder);*/


//--------------------------TROCO e Finalização do Pedido--------------------------------------------


// Função para calcular o troco
function calcularTroco() {
    const valorPago = parseFloat(valueInput.value.replace(/[^\d,]/g, "").replace(",", "."));
    const totalPedido = calculateTotal(); // Calcula o total do pedido
    const troco = valorPago - totalPedido;

    if (isNaN(troco) || troco < 0) {
        trocoWarn.classList.remove("hidden");
        valueInput.classList.add("border-red-500");
    } else {
        trocoWarn.classList.add("hidden");
        valueInput.classList.remove("border-red-500");
    }
}

// Função para verificar o valor do troco e exibir/esconder o aviso se necessário
function verificarValorTroco() {
    const valorPago = parseFloat(valueInput.value.replace(/[^\d,]/g, "").replace(",", "."));
    const totalPedido = calculateTotal(); // Calcula o total do pedido

    if (paymentMethodSelect.value === "Dinheiro" && (isNaN(valorPago) || valorPago < totalPedido)) {
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
    if (addressInput.value.trim() === "") {
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
    if (addressInput.value.trim() !== "") {
        addressWarn.classList.add("hidden");
        addressInput.classList.remove("border-red-500");
    }
});

function calcularTroco() {
    const valorPago = parseFloat(valueInput.value.replace(/[^\d,]/g, "").replace(",", "."));
    const troco = valorPago - total;

    if (!isNaN(troco) && troco >= 0) {
        trocoMessage = `%0ATroco: R$ ${troco.toFixed(2)}`;
    } else {
        trocoMessage = ""; // Limpa o trocoMessage se o valor for insuficiente
    }
}

// Finalizar Pedido com verificações atualizadas
checkoutBtn.addEventListener("click", function() {
    if (cart.length === 0) return;
    console.log("Itens no carrinho:", cart); 

    // Atualiza o total antes de construir a mensagem
    total = calculateTotal();
    console.log("Total calculado:", total); 

    // Verifica endereço
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    // Verifica método de pagamento
    if (paymentMethodSelect.value === "_blank") {
        paymentwarn.classList.remove("hidden");
        paymentMethodSelect.classList.add("border-red-500");
        return;
    }

    // Verifica o valor no campo de troco
    const valorPago = parseFloat(valueInput.value.replace(/[^\d,]/g, "").replace(",", "."));
    if (paymentMethodSelect.value === "Dinheiro" && (isNaN(valorPago) || valorPago < total)) {
        trocoWarn.classList.remove("hidden");
        valueInput.classList.add("border-red-500");
        return;
    }

    // Calcula o troco apenas se a forma de pagamento for dinheiro e o valor for suficiente
    const paymentMethod = paymentMethodSelect.value;
    let trocoMessage = "";
    if (paymentMethod === "Dinheiro" && valorPago >= total) {
        const troco = valorPago - total;
        trocoMessage = `Troco: R$ ${troco.toFixed(2)}`;
    }

    // Cria a mensagem de pedido para o WhatsApp
    const cartItems = cart.map((item) => {
        // Inicia com o nome do item e sua quantidade
        let itemDetails = `*${item.name}* - Quantidade: (${item.quantity})`;
    
        // Adiciona complementos (açaí e salgados)
        if (item.type === "acai" && item.complements && item.complements.length > 0) {
            itemDetails += "\nComplementos:";
            itemDetails += item.complements.map(complement => 
                `\n  • ${complement.name} x ${complement.quantity}`
            ).join("");
        }
    
        // Adiciona adicionais (pães)
        if (item.type === "pao" && item.additionals && item.additionals.length > 0) {
            itemDetails += "\nAdicionais:";
            itemDetails += item.additionals.map(additional => 
                `\n  • ${additional.name} x ${additional.quantity}`
            ).join("");
        }
    
        return itemDetails;
    }).join("\n\n"); // Separa cada item do carrinho com duas quebras de linha
    
    // Monta a mensagem final
    const message = encodeURIComponent(
        `*PEDIDO DETALHADO*\n\n` +
        `${cartItems}\n\n` +
        `*Endereço: ${addressInput.value}\n` +
        `*Forma de Pagamento: ${paymentMethod}\n` +
        `*Observações: ${obsInput.value || "Nenhuma"}\n` +
        `*Total do Pedido: R$ ${total.toFixed(2)}\n` +
        `${trocoMessage || ""}`
    );
    
    // Número de telefone (ajuste conforme necessário)
    const phone = "5533988538798";
    
    // Abre o link do WhatsApp com a mensagem formatada
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
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