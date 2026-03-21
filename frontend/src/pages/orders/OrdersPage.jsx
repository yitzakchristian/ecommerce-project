import dayjs from 'dayjs'
import axios from 'axios'
import { formatMoney } from '../../utils/money'
import { Fragment, useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import './OrdersPage.css'

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('/api/orders?expand=products')
      .then(response => setOrders(response.data))
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div class="orders-page">
        <div class="page-title">Your Orders</div>
        <div class="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} class="order-container">

                <div class="order-header">
                  <div class="order-header-left-section">
                    <div class="order-date">
                      <div class="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format('dddd, MMMM D')}</div>
                    </div>
                    <div class="order-total">
                      <div class="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div class="order-details-grid">
                  {order.products.map((orderProduct) => {
                    return (
                      <Fragment key={orderProduct.product.id}>
                        <div class="product-image-container">
                          <img src={orderProduct.product.image} />
                        </div>

                        <div class="product-details">
                          <div class="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div class="product-delivery-date">
                            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM, D')}
                          </div>
                          <div class="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png" />
                            <span class="buy-again-message">Add to Cart</span>
                          </button>
                        </div>

                        <div class="product-actions">
                          <a href="/tracking">
                            <button class="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}