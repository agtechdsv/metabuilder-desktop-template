const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../src-tauri/tauri.conf.json');

try {
  const args = process.argv.slice(2);
  const appName = args[0] || 'MetaBuilder Desktop';

  // Gerar um identifier limpo (ex: com.metabuilder.desktop)
  const safeName = appName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const identifier = `com.${safeName || 'metabuilder'}.desktop`;

  let configData = fs.readFileSync(configPath, 'utf8');
  let config = JSON.parse(configData);

  // Update product name and identifier
  config.productName = appName;
  config.identifier = identifier;

  // Update window title if it exists
  if (config.app && config.app.windows && config.app.windows.length > 0) {
    config.app.windows[0].title = appName;
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  console.log(`Sucesso: tauri.conf.json atualizado para "${appName}" (ID: ${identifier})`);
} catch (error) {
  console.error('Erro ao atualizar tauri.conf.json:', error);
  process.exit(1);
}
