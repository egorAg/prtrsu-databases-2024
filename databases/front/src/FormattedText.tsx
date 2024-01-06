import React from 'react';

interface FormattedTextProps {
  username: string | null;
  settings: Record<string, any>;
  text: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ username, settings, text }) => {
  const { fontFamily, fontSize, fontColor, fontStyle } = settings;

  console.log(settings);

  const textStyle: React.CSSProperties = {
    fontFamily,
    fontSize: fontSize + 'px',
    color: fontColor,
    fontWeight: fontStyle,
  };

  return (
    <div className="formatted-text">
      <h2>Отформатированный текст</h2>
      <p>
        Пользователь: {username ? username : 'Не выбран'}
      </p>
      <div style={textStyle}>{text}</div>
    </div>
  );
};

export default FormattedText;
