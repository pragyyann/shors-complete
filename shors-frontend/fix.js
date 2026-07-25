const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const replacement = `      </section>
      )}

      {/* 3. The SHORS Manifesto Section (Merged Philosophy & Problem) - Full Bleed Redesign */}
      <section id="philosophy" className="manifesto-fullbleed-section">
        {/* Centered Heading */}
        <div className="manifesto-header">
          <span className="section-kicker">
            The Manifesto
          </span>
          <h2 className="section-title">Heritage in Motion</h2>
        </div>

        {/* 2-Column Split Content */}`;

content = content.replace(
`      </section>
      )}

        </div>

        {/* 2-Column Split Content */}`,
replacement
);

fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Fixed page.tsx');
