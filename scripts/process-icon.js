const fs = require('fs');
const path = require('path');

try {
  const args = process.argv.slice(2);
  const base64Data = args[0];

  if (!base64Data || base64Data === 'null') {
    console.log('Nenhum ícone fornecido. Usando padrão.');
    process.exit(0);
  }

  // Remove data URL prefix se existir (ex: data:image/png;base64,)
  const base64String = base64Data.replace(/^data:image\/\w+;base64,/, "");
  
  const buffer = Buffer.from(base64String, 'base64');
  const iconPath = path.join(__dirname, 'temp-icon.png');
  
  fs.writeFileSync(iconPath, buffer);
  console.log('Sucesso: Ícone base salvo em', iconPath);
} catch (error) {
  console.error('Erro ao processar ícone base64:', error);
  // Não fazemos exit(1) para não quebrar o build se o ícone falhar
  process.exit(0);
}
