import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../style/CustomTimePicker.css';

const CustomTimePicker = ({ value, onChange, minTime, maxTime, compareTime }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const timePickerRef = useRef(null);

  const handleDocumentClick = (event) => {
    if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  React.useEffect(() => {
    if (value) {
      const [hour, minute] = value.split(':');
      setSelectedHour(hour);
      setSelectedMinute(minute);
    } else {
      setSelectedHour('');
      setSelectedMinute('');
    }
  }, [value]);

  const generateHourOptions = () => {
    const options = [];
    const [minHour] = minTime.split(':').map(Number);
    const [maxHour] = maxTime.split(':').map(Number);

    for (let hour = minHour; hour <= maxHour; hour++) {
      options.push(hour.toString().padStart(2, '0'));
    }
    return options;
  };

  const generateMinuteOptions = () => {
    const options = [];
    for (let minute = 0; minute <= 59; minute++) {
      options.push(minute.toString().padStart(2, '0'));
    }
    return options;
  };

  const handleHourSelect = (hour) => {
    if (compareTime && hour >= compareTime.split(':')[0]) {
      setSelectedHour(compareTime.split(':')[0]);
      setSelectedMinute(compareTime.split(':')[1]);
      onChange(`${compareTime.split(':')[0]}:${compareTime.split(':')[1]}`);
      return;
    }
    setSelectedHour(hour);
    if (selectedMinute !== '') {
      onChange(`${hour}:${selectedMinute}`);
    }
  };

  const handleMinuteSelect = (minute) => {
    if (selectedHour !== '' && compareTime) {
      const selectedTime = `${selectedHour}:${minute}`;
      if (selectedTime > compareTime) {
        setSelectedHour(compareTime.split(':')[0]);
        setSelectedMinute(compareTime.split(':')[1]);
        onChange(`${compareTime.split(':')[0]}:${compareTime.split(':')[1]}`);
        return;
      }
    }
    setSelectedMinute(minute);
    if (selectedHour !== '') {
      onChange(`${selectedHour}:${minute}`);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const hourOptions = generateHourOptions();
  const minuteOptions = generateMinuteOptions();

  const displayTime = selectedHour && selectedMinute ? `${selectedHour}:${selectedMinute}` : '--:--';

  return (
    <div className="custom-time-picker" ref={timePickerRef}>
      <div className="time-picker-display" onClick={toggleDropdown}>
        <span>{displayTime}</span>
      </div>
      {showDropdown && (
        <div className="time-picker-dropdown">
          <div className="time-picker-options">
            <div className="time-picker-column">
              {hourOptions.map((hour) => (
                <div
                  key={hour}
                  className={`time-picker-option ${hour === selectedHour ? 'selected' : ''}`}
                  onClick={() => handleHourSelect(hour)}
                >
                  {hour}
                </div>
              ))}
            </div>
            <div className="time-picker-column">
              {minuteOptions.map((minute) => (
                <div
                  key={minute}
                  className={`time-picker-option ${minute === selectedMinute ? 'selected' : ''}`}
                  onClick={() => handleMinuteSelect(minute)}
                >
                  {minute}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CustomTimePicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  minTime: PropTypes.string.isRequired,
  maxTime: PropTypes.string.isRequired,
  compareTime: PropTypes.string,  // New prop to compare check-in with check-out
};

export default CustomTimePicker;
