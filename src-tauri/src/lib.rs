use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      // Grava o HTML da splash em um arquivo temporário e carrega via file://
      let splash_html_raw = include_str!("../splash.html");
      let version = app.package_info().version.to_string();
      let app_name = app.package_info().name.clone();
      let splash_html = splash_html_raw
        .replace("<span id=\"version\">v1.0.0</span>", &format!("<span id=\"version\">v{}</span>", version))
        .replace("<span id=\"app-name\">App</span>", &format!("<span id=\"app-name\">{}</span>", app_name));
      
      let splash_path = std::env::temp_dir().join(format!("metabuilder_client_splash_{}.html", version));
      std::fs::write(&splash_path, splash_html)
        .expect("Falha ao escrever splash.html temporário");

      let splash_url_str = format!("file:///{}", splash_path.to_string_lossy().replace('\\', "/"));
      let splash_url = tauri::Url::parse(&splash_url_str)
        .expect("URL da splash inválida");

      let _splash_window = tauri::WebviewWindowBuilder::new(
        app,
        "splashscreen",
        tauri::WebviewUrl::External(splash_url),
      )
      .title(app_name)
      .inner_size(580.0, 360.0)
      .resizable(false)
      .decorations(false)
      .transparent(true)
      .always_on_top(true)
      .center()
      .visible(true)
      .build()?;

      // Transição: aguarda animação completa e mostra a janela principal maximizada
      let app_handle = app.handle().clone();
      std::thread::spawn(move || {
        std::thread::sleep(std::time::Duration::from_millis(3000));

        if let Some(splash) = app_handle.get_webview_window("splashscreen") {
          let _ = splash.close();
        }
        if let Some(main) = app_handle.get_webview_window("main") {
          let _ = main.maximize();
          let _ = main.show();
          let _ = main.set_focus();
        }

        let splash_tmp = std::env::temp_dir().join(format!("metabuilder_client_splash_{}.html", version));
        let _ = std::fs::remove_file(splash_tmp);
      });

      Ok(())
    })
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_fs::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
