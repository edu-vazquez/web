        // Función para mostrar el contenido del archivo
        function showFileContent(fileName) {
            const contentArea = document.getElementById('file-content');
            let content = '';
            let language = '';

            // Definir contenido de los archivos con sintaxis
            if (fileName === 'index.html') {
                content = 
                    `<h1>Eduardo Vazquez</h1><pre class="line-numbers">
<code class="language-markup">
&lt;!DOCTYPE cv&gt;
    &lt;cv lang=&quot;es&quot;&gt;
    &lt;head&gt;
        &lt;meta telefono=&quot;613514974&quot;/&gt;
        &lt;meta direccion=&quot;Barcelona, CP 08028&quot;/&gt;
        &lt;meta email=&quot;iam.eduardovazquez@icloud.com&quot;/&gt;
        &lt;link href=&quot;https://www.eduardo-vazquez.com/cv&quot;/&gt;
    &lt;/head&gt;
    &lt;main&gt;
        &lt;section id=&quot;PERFIL PROFESIONAL&quot;&gt;
            &lt;p&gt; Como arquitecto con una pasión por el diseño, la creatividad y la programación, 
            mi objetivo es fusionar mi experiencia en diseño con mis habilidades en desarrollo web.&lt;/p&gt;
            &lt;p&gt;Busco oportunidades que me permitan explorar nuevas formas de expresión digital, aspiro a contribuir al desarrollo de sitios web y
            aplicaciones que inspiren y cautiven a los usuarios, combinando mi pasión por el diseño con mi profundo conocimiento técnico en programación.&lt;/p&gt;
        &lt;/section&gt;

        &lt;section class=&quot;EXPERIENCIA LABORAL&quot; id=&quot;GESTION DE PROYECTOS&quot;&gt;
            &lt;h2&gt;Vinsoca 2019-2020 / A&amp;R 2017-2018 / SENAVITAT 2015-2017 / Priori Ingeniería 2007-2009&lt;/h2&gt;
            &lt;ul&gt;
                &lt;li&gt;Desarrollo de proyectos. Gestión de proyectos&lt;/li&gt;
                &lt;li&gt;Elaboración de proyecto ejecutivo, presupuestos y gestión de obras&lt;/li&gt;
                &lt;li&gt;Ejecución y gestión de obra&lt;/li&gt;
                &lt;li&gt;Sesiones de formación&lt;/li&gt;
                &lt;li&gt;Seguimiento de casos y resolución de incidencias&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/section&gt;

        &lt;section class=&quot;EXPERIENCIA LABORAL&quot; id=&quot;DISEÑO ARQUITECTÓNICO&quot;&gt;
            &lt;h2&gt;Ingenia 2020-2022 / Achon, La Bella Cucina 2010-2014 &lt;/h2&gt;
            &lt;ul&gt;
                &lt;li&gt;Desarrollo de proyecto y presupuesto&lt;/li&gt;
                &lt;li&gt;Diseño de mobiliario&lt;/li&gt;
                &lt;li&gt;Detección de necesidades, resolución de dudas y problemas. Generar propuestas y presentación de las mismas&lt;/li&gt;
                &lt;li&gt;Contacto directo con el cliente para el desarrollo de proyectos: comunicación telefónica, presencial y por mail&lt;/li&gt;
                &lt;li&gt;Negociación de presupuesto y cierre de ventas&lt;/li&gt;
                &lt;li&gt;Asesor comercial&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/section&gt;
    &lt;/main&gt;
&lt;/cv&gt;
                            </code></pre>`;
            } else if (fileName === 'style.css') {
                content = 
                    `<h1>style.css</h1><pre class="line-numbers"><code class="language-css">body 
background-color: #f0f0f0;}
h1 {
    color: #333;
}</code></pre>`;
            } else if (fileName === 'app.js') {
                content = `<h1>app.js</h1><pre class="line-numbers"><code class="language-javascript">console.log("Hola Mundo");
                    const saludo = "Bienvenido a mi aplicación";
                    alert(saludo);</code></pre>`;
            } else if (fileName === 'readme.md') {
                content = `<h1>README.md</h1><pre class="line-numbers"><code class="language-markdown"># Mi Proyecto
                    Este es un proyecto ddesarrollado con vanilaJS, CSS, HTML y Prism.js.</code></pre>`;
            }

            contentArea.innerHTML = content;

            // Recargar Prism.js para resaltar la sintaxis
            Prism.highlightAll();
        }

        // Función para abrir o cerrar carpetas
        function toggleFolder(folderId) {
            const folder = document.getElementById(folderId);
            folder.classList.toggle('open');
            folder.classList.toggle('closed');
        }

        //para que los links sean clikeables

        document.querySelectorAll('pre code').forEach((block) => {
            const links = block.innerHTML.match(/&lt;a href="(.*?)"&gt;(.*?)&lt;\/a&gt;/g);
            if (links) {
                links.forEach(link => {
                    block.innerHTML = block.innerHTML.replace(link, `<a href="${link.match(/href="(.*?)"/)[1]}" target="_blank">${link.match(/&gt;(.*?)&lt;/)[1]}</a>`);
                });
            }
        });
        