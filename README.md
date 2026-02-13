# 📘 README.md

````markdown
# 🧪 Playwright + Cucumber (TypeScript) – SauceDemo Automation 
# gft-sauce-demo

Framework de automatización E2E usando:

- Playwright
- Cucumber (BDD)
- TypeScript
- Reporte HTML
- Video siempre
- Screenshot automático en fallos

---

# 🚀 1️⃣ Instalación paso a paso

## 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd gft-sauce-demo
````

## 2. Instalar dependencias

```bash
npm install
```

## 3. Instalar navegadores de Playwright

```bash
npx playwright install
```

---

# ▶️ 2️⃣ Ejecutar todos los tests

```bash
npm test
```

O directamente:

```bash
npx cucumber-js
```

---

# 🔥 3️⃣ Ejecutar solo los tests @smoke

```bash
npx cucumber-js --tags "@smoke"
```
---

# 📊 4️⃣ Abrir el reporte HTML generado

Después de ejecutar los tests, el reporte se genera en:

```
/reports/report.html
```

Abrir manualmente:

```bash
start reports/report.html   # Windows
open reports/report.html    # Mac
```

---

# 🎥 Evidencias

* 🎬 Video: Se graba siempre por escenario
* 📸 Screenshot: Solo cuando un escenario falla
* 📁 Ubicación:

```
reports/
 ├── screenshots/
 └── videos/
```

---

# 📂 5️⃣ Estructura del proyecto

```
gft-sauce-demo/
│
├── features/
│   ├── login.feature
│   └── purchase.feature
│
├── src/
│   ├── pages/          # Page Objects
│   ├── steps/          # Step Definitions
│   └── resources/
│       └── support/
│           ├── hooks.ts
│           └── world.ts
│
├── reports/            # Evidencias y reporte HTML
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🏗️ Arquitectura

* **Page Object Model (POM)** para separar lógica de UI.
* **Hooks centralizados** para manejo de navegador, video y screenshots.
* **Custom World** para compartir contexto entre steps.
* Configuración preparada para ejecución local y CI/CD.

---

# ⚙️ Variables de entorno

Para ejecutar en modo headless:

Windows:

```bash
set HEADLESS=true && npm test
```

Mac/Linux:

```bash
HEADLESS=true npm test
```

---

# 👨‍💻 Autor

Yefri Ruiz Mosquera

```
