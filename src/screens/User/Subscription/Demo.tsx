import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {WEEKDAYS} from '../../../common/constant';

const WeekOfMonthSelector = ({onWeekSelect, selectedWeek}: any) => {
  const weeks = ['1st', '2nd', '3rd', '4th', 'Last'];
  return (
    <View
      style={{
        width: '40%',
      }}>
      <Select
        placeholder="Select Week"
        onSelect={onWeekSelect}
        value={selectedWeek + ' week'}>
        {weeks.map((week, index) => (
          <SelectItem key={index} title={`${week} Week`} />
        ))}
      </Select>
    </View>
  );
};

const DayOfWeekSelector = ({onDaySelect, selectedDayOfWeek}: any) => {
  return (
    <View
      style={{
        width: '40%',
      }}>
      <Select
        placeholder="Select Day"
        onSelect={onDaySelect}
        value={WEEKDAYS[selectedDayOfWeek]}>
        {[
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ].map((day, index) => (
          <SelectItem key={index} title={day} />
        ))}
      </Select>
    </View>
  );
};

interface MonthlyOccurrenceFormProps {
  monthlyOccurrences: any;
  setMonthlyOccurrences: any;
}

const MonthlyOccurrenceForm = ({
  monthlyOccurrences,
  setMonthlyOccurrences,
}: MonthlyOccurrenceFormProps) => {
  const [selectedWeek, setSelectedWeek] = useState<any>(new IndexPath(0));
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<any>(
    new IndexPath(0),
  );

  const handleAddOccurrence = () => {
    const week = selectedWeek.row + 1; // Adjusting for zero-indexed to 1-indexed
    const dayOfWeek = selectedDayOfWeek;
    const newOccurrence = {week, dayOfWeek};
    setMonthlyOccurrences([...monthlyOccurrences, newOccurrence]);
  };

  const handleRemoveOccurrence = (index: any) => {
    setMonthlyOccurrences(
      monthlyOccurrences.filter((_: any, idx: any) => idx !== index),
    );
  };

  useEffect(() => {
    console.log('monthlyOccurrences', monthlyOccurrences);
  }, [monthlyOccurrences]);

  return (
    <View>
      <Text>Select Monthly Occurrences:</Text>
      <View className="flex-row justify-between border border-gray-200 p-2 rounded-md mt-2 w-full">
        <WeekOfMonthSelector
          onWeekSelect={(index: any) => setSelectedWeek(index)}
          selectedWeek={selectedWeek}
        />
        <DayOfWeekSelector
          onDaySelect={(index: any) => setSelectedDayOfWeek(index.row)}
          selectedDayOfWeek={selectedDayOfWeek}
        />
      </View>
      <Button title="Add Occurrence" onPress={handleAddOccurrence} />
      {monthlyOccurrences.map((occurrence: any, index: any) => (
        <View
          key={index}
          className="flex-row justify-between border border-gray-200 p-2 rounded-md mt-2">
          <Text className="text-xs">
            Deliver on the every month{' '}
            <Text className="font-bold">
              {['1st', '2nd', '3rd', '4th', 'Last'][occurrence.week - 1]}
            </Text>
            {' week '}
            <Text className="font-bold">
              {
                [
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ][occurrence.dayOfWeek]
              }
            </Text>
          </Text>
          <Button
            title="Remove"
            onPress={() => handleRemoveOccurrence(index)}
          />
        </View>
      ))}
    </View>
  );
};

export default MonthlyOccurrenceForm;
