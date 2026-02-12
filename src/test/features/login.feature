Feature: como usuario, deseo probar la compra y el login de saucedemo
 
 
 Background: ingreso a saucedemo
  Given que ingreso al sitio saucedemo


  @smoke @critical
  Scenario: Generar la compra exitosa de un producto
    When ingreso el usuario "standard_user" y clave "secret_sauce"
    And agrego el producto "Sauce Labs Backpack" al carrito 
    And ingreso los datos del comprador "Jose" "Soza" "050001"
    Then confirmo el mensaje de compra exitosa ""Thank you for your order!"
