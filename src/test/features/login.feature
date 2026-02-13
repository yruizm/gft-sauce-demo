Feature: como usuario, deseo probar la compra y el login de saucedemo
 
 
 Background: ingreso a saucedemo
  Given que ingreso al sitio saucedemo


  @smoke @critical
  Scenario: Generar la compra exitosa de un producto
    When ingreso el usuario "standard_user" y clave "secret_sauce"
    And agrego el producto "Sauce Labs Backpack" al carrito 
    And ingreso los datos del comprador "Jose" "Soza" "050001"
    Then confirmo el mensaje de compra exitosa "Thank you for your order!"


  @negative @regression
  Scenario: Login Fallido Usuario bloqueado
    When ingreso el usuario "locked_out_user" y clave "secret_sauce"
    Then confirmo el mensaje de error "Epic sadface: Sorry, this user has been locked out."

  @regression
  Scenario Outline: Login multiples usuarios
    When ingreso el usuario "<usuario>" y clave "<clave>"
    Then confirmo el inicio de sesion
    Examples:
      | usuario        | clave          |
      | standard_user  | secret_sauce |
      | problem_user     | secret_sauce   |
      | performance_glitch_user     | secret_sauce   |