import React, { useState } from 'react';
import { useConfig, Theme, FontSize, Density } from '../../contexts/ConfigContext';
import { Card } from '../Card/Card';
import { Form } from '../Form/Form';

const SettingsPanel: React.FC = () => {
  const { config, updateConfig, resetConfig } = useConfig();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleThemeChange = (theme: Theme) => updateConfig({ theme });
  const handleFontSizeChange = (size: FontSize) => updateConfig({ fontSize: size });
  const handleDensityChange = (density: Density) => updateConfig({ density });
  const handleNotificationChange = (key: keyof typeof config.notifications, value: boolean) => {
    updateConfig({ notifications: { ...config.notifications, [key]: value } });
  };

  const handleReset = () => {
    resetConfig();
    setShowResetConfirm(false);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>⚙️ Configuración de la Tienda</Card.Title>
        <Card.Actions>
          <button onClick={() => setShowResetConfirm(true)} className="btn-reset">
            Restaurar valores
          </button>
        </Card.Actions>
      </Card.Header>
      <Card.Body>
        {/* Tema */}
        <div className="setting-group">
          <h4>Tema visual</h4>
          <div className="button-group">
            <button onClick={() => handleThemeChange('light')} className={config.theme === 'light' ? 'active' : ''}>
              ☀️ Claro
            </button>
            <button onClick={() => handleThemeChange('dark')} className={config.theme === 'dark' ? 'active' : ''}>
              🌙 Oscuro
            </button>
            <button onClick={() => handleThemeChange('system')} className={config.theme === 'system' ? 'active' : ''}>
              🖥️ Sistema
            </button>
          </div>
        </div>

        {/* Tamaño de texto */}
        <div className="setting-group">
          <h4>Tamaño de texto</h4>
          <div className="button-group">
            <button onClick={() => handleFontSizeChange('small')} className={config.fontSize === 'small' ? 'active' : ''}>
              Pequeño
            </button>
            <button onClick={() => handleFontSizeChange('medium')} className={config.fontSize === 'medium' ? 'active' : ''}>
              Mediano
            </button>
            <button onClick={() => handleFontSizeChange('large')} className={config.fontSize === 'large' ? 'active' : ''}>
              Grande
            </button>
          </div>
          <div className="preview-text">Vista previa: Este es un texto de ejemplo.</div>
        </div>

        {/* Densidad */}
        <div className="setting-group">
          <h4>Densidad de contenido</h4>
          <div className="button-group">
            <button onClick={() => handleDensityChange('compact')} className={config.density === 'compact' ? 'active' : ''}>
              Compacto
            </button>
            <button onClick={() => handleDensityChange('normal')} className={config.density === 'normal' ? 'active' : ''}>
              Normal
            </button>
            <button onClick={() => handleDensityChange('spacious')} className={config.density === 'spacious' ? 'active' : ''}>
              Espacioso
            </button>
          </div>
          <div className="density-preview">
            <div className="demo-card">Elemento demo</div>
            <div className="demo-card">Otro elemento</div>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="setting-group">
          <h4>Notificaciones</h4>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Field>
              <Form.Label>📧 Correo electrónico</Form.Label>
              <input
                type="checkbox"
                checked={config.notifications.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
              />
            </Form.Field>
            <Form.Field>
              <Form.Label>📱 Push</Form.Label>
              <input
                type="checkbox"
                checked={config.notifications.push}
                onChange={(e) => handleNotificationChange('push', e.target.checked)}
              />
            </Form.Field>
            <Form.Field>
              <Form.Label>🔊 Sonido</Form.Label>
              <input
                type="checkbox"
                checked={config.notifications.sound}
                onChange={(e) => handleNotificationChange('sound', e.target.checked)}
              />
            </Form.Field>
          </Form>
        </div>
      </Card.Body>
      <Card.Footer>
        <small>Los cambios se guardan automáticamente y afectan a toda la aplicación.</small>
      </Card.Footer>

      {showResetConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Restaurar todos los valores a los predeterminados?</p>
            <button onClick={handleReset}>Sí, restaurar</button>
            <button onClick={() => setShowResetConfirm(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SettingsPanel;