import React from 'react';

interface FormattedTextProps {
  username: string | null;
  settings: {
    fontName: string;
    fontSize: number;
    fontColor: string;
    fontStyle: string;
  };
  text: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ username, settings, text }) => {
  const { fontName, fontSize, fontColor, fontStyle } = settings;

  const textStyle: React.CSSProperties = {
    fontFamily: fontName,
    fontSize: fontSize + 'px',
    color: fontColor,
    fontStyle: fontStyle,
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
