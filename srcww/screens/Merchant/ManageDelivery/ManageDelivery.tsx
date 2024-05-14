import React, {useEffect, useState} from 'react';
import {
  assignDeliveryToEmployee,
  getAvailableEmployees,
  getUpcomingDeliveries,
} from '../../../services/deliveryService';

function ManageDeliveries({businessId}) {
  const [deliveries, setDeliveries] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const upcomingDeliveries = await getUpcomingDeliveries(businessId);
      const availableEmployees = await getAvailableEmployees(businessId);
      setDeliveries(upcomingDeliveries);
      setEmployees(availableEmployees);
    }
    fetchData();
  }, [businessId]);

  const handleAssign = async (subscriptionId, deliveryDate, employeeId) => {
    const employee = employees.find(e => e.employeeId === employeeId);
    await assignDeliveryToEmployee(
      subscriptionId,
      deliveryDate,
      employeeId,
      employee.employeeName,
    );
    alert('Delivery assigned!');
  };

  return (
    <div>
      {deliveries.map(delivery => (
        <div key={delivery._id}>
          <h3>
            {delivery.productName} -{' '}
            {delivery.nextDeliveryDate.toLocaleDateString()}
          </h3>
          <select
            onChange={e =>
              handleAssign(
                delivery._id,
                delivery.nextDeliveryDate,
                e.target.value,
              )
            }>
            {employees.map(employee => (
              <option key={employee.employeeId} value={employee.employeeId}>
                {employee.employeeName}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default ManageDeliveries;
