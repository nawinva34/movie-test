import React, { useState, useEffect } from 'react'
import { Menu, Badge, Modal, List, Button } from 'antd'
import { ShoppingCartOutlined, QrcodeOutlined } from '@ant-design/icons'

const Navbar = ({ cart, setCart }) => {
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); 


  const itemCount = cart.length

  const showCartModal = () => {
    setIsCartModalVisible(true);
  };

  const hideCartModal = () => {
    setIsCartModalVisible(false);
  };

  const showPaymentModal = () => {
    setIsPaymentModalVisible(true);
    startTimer();
  };

  const hidePaymentModal = () => {
    setIsPaymentModalVisible(false);
    setRemainingTime(60); 
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice += item.price;
    }

    if (cart.length >= 3 && cart.length < 5) {
      totalPrice *= 0.9;
    } else if (cart.length >= 5) {
      totalPrice *= 0.8;
    }

    return totalPrice.toFixed(2);
  };

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          hidePaymentModal(); 
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isPaymentModalVisible && remainingTime === 0) {
      hidePaymentModal(); 
    }
  }, [isPaymentModalVisible, remainingTime]);


  return (
    <div>
      <Menu
        mode="horizontal"
        theme=""
        className="h-16 flex justify-end"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Menu.Item key="cart">
          <Badge count={itemCount} showZero onClick={showCartModal}>
            <ShoppingCartOutlined style={{ fontSize: 25 }} />
          </Badge>
        </Menu.Item>
      </Menu>
      <Modal
        title="List Cart"
        visible={isCartModalVisible}
        onCancel={hideCartModal}
        footer={null}
      >
        <List
          dataSource={cart}
          renderItem={(item) => (
            <List.Item className="flex justify-between">
              <span className="flex-grow text-base font-mono">{item.title}</span>
              <span>{item.price} $</span>
            </List.Item>
          )}
        />
        <hr/>
        <p className='pt-3 font-thin'>When purchasing more than 3 movies you get a 10% discount, more than 5 movies you get a 20% discount.</p>
        <div style={{ marginTop: '20px' }} className="flex justify-between">
          <Button type="primary" danger onClick={clearCart}>
            Clear Cart
          </Button>
          <div className="flex">
            <p className="text-base font-bold pt-1 pr-2">
              Total Price: {calculateTotalPrice()} $
            </p>
            <Button onClick={showPaymentModal}>Check out</Button>
          </div>
        </div>
      </Modal>
      <Modal
        title={`Payment Method (Closes in ${remainingTime} seconds)`}
        visible={isPaymentModalVisible}
        onCancel={hidePaymentModal}
        footer={null}
      >
        <QrcodeOutlined style={{display:'flex', justifyContent:'center', fontSize: 300}}/>
      </Modal>
    </div>
  )
}

export default Navbar
