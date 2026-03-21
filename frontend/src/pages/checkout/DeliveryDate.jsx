import dayjs from "dayjs"

export function DeliveryDate({ selectedDeliveryOption }) {
  const dateString = dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs)
    .format('dddd, MMMM D');

  return (
    <div className="delivery-date">
      {`Delivery date: ${dateString}`}
    </div>
  )
}