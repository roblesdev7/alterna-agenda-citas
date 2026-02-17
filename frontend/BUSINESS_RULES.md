# Business Rules & Scenarios - Appointment Management System

This document outlines the business rules, edge cases, and handling procedures for the appointment management system.

## Appointment Statuses

### 1. **Confirmed** (Confirmada)
- Default status when appointment is created
- Customer has booked and confirmed the appointment
- Waiting for customer arrival

**Actions Available:**
- Mark as "Cliente Llegó" (In Progress)
- Mark as "Llegó Tarde" (Arrived Late)
- Mark as "No Asistió" (No-Show)
- Cancel appointment

### 2. **In Progress** (En Curso)
- Customer has arrived on time
- Service is being provided
- Resource is currently busy with this customer

**Actions Available:**
- Mark as "Completada" (Completed)

**Business Rules:**
- Block resource schedule during this time
- Cannot cancel once started
- Track actual start time for analytics

### 3. **Arrived Late** (Llegó Tarde)
- Customer arrived more than 10 minutes late
- Service may be shortened or charged extra
- Track tardiness for customer history

**Automatic Triggers:**
- If customer checks in > 10 min after scheduled time

**Business Rules:**
- If > 15 min late: **Charge full service price + late fee**
- If > 30 min late: **Option to reschedule** or proceed with shortened service
- Record in customer history for future reference

**Actions Available:**
- Mark as "Completada" (with notes about shortened service)
- Cancel if too late to provide adequate service

### 4. **No-Show** (No Asistió)
- Customer didn't arrive for appointment
- No prior cancellation
- Financial penalty applies

**Automatic Triggers:**
- If 30 minutes past appointment time and no check-in

**Business Rules:**
- **Charge 50% cancellation fee**
- Record in customer profile
- After 3 no-shows: Require deposit for future bookings
- Send notification to customer
- Free up resource's schedule

**Recovery Actions:**
- Customer can contact within 24h to explain and potentially waive fee
- Document reason for no-show

### 5. **Completed** (Completada)
- Service was successfully provided
- Customer left satisfied
- Payment collected

**Automatic Triggers:**
- When service end time is reached
- Admin manually confirms completion

**Post-Completion Actions:**
- Send thank you email
- Request feedback/rating
- Update resource availability
- Record in financial reports

### 6. **Cancelled** (Cancelada)
- Appointment was cancelled before service
- Can be cancelled by customer or admin

**Cancellation Policy:**
- **More than 24 hours before:** Free cancellation
- **2-24 hours before:** 25% cancellation fee
- **Less than 2 hours before:** 50% cancellation fee
- **Less than 30 min before:** 100% fee (treated as no-show)

**Business Rules:**
- Must record cancellation reason
- Notify resource immediately
- Free up time slot
- Offer to reschedule

---

## Edge Cases & Special Scenarios

### Scenario 1: Emergency Cancellation by Business
**Situation:** Resource is sick, emergency closure, etc.

**Actions:**
1. Immediately notify all affected customers
2. Offer priority rebooking options
3. No penalties for customers
4. Provide incentive (discount) for inconvenience

### Scenario 2: Customer Arrives Very Late (>30 min)
**Decision Tree:**
1. Check next appointment gap
2. If gap exists → Offer shortened service
3. If no gap → Offer to reschedule with priority
4. Charge full price + late fee

**Communication:**
- "We can provide a 15-minute service instead of 30 minutes"
- "Or reschedule for [next available time] with no charge"

### Scenario 3: Back-to-Back Late Arrivals
**Risk:** Cascade delay affecting multiple customers

**Mitigation:**
- Auto-adjust subsequent appointments
- Notify affected customers immediately
- Offer discounts for delayed service
- Add buffer time after known problematic slots

### Scenario 4: Over-booking by Mistake
**Prevention:**
- System validation prevents double-booking
- Block out times when creating appointments

**If it occurs:**
1. Identify both customers immediately
2. Offer first customer: proceed as scheduled
3. Offer second customer: 
   - Free upgrade to longer service
   - Priority rebooking
   - 20% discount

### Scenario 5: Customer Wants to Extend Service Mid-Appointment
**Check:**
- Is there buffer time before next appointment?

**If yes:**
- Approve extension
- Charge additional time pro-rata
- Update appointment end time

**If no:**
- Offer to book follow-up appointment
- Suggest longer service next time

### Scenario 6: Payment Issues
**Scenarios:**
- Customer can't pay after service
- Credit card declined
- Dispute about pricing

**Actions:**
1. Remain professional and calm
2. Verify pricing was communicated upfront
3. Offer payment plan if necessary
4. Mark appointment as "completed-payment-pending"
5. Follow up within 24 hours
6. Block future bookings until resolved

---

## Automatic Notifications

### To Customers:

**24 Hours Before:**
- Reminder email/SMS
- Includes: cancellation policy, what to bring, parking info

**2 Hours Before:**
- Final reminder
- Option to cancel (with fee warning)

**On Arrival:**
- Welcome message
- Estimated wait time if delayed

**After Service:**
- Thank you message
- Request for feedback
- Offer to book next appointment

**Cancellation:**
- Confirmation of cancellation
- Fee details (if applicable)
- Rebooking link

### To Resources/Staff:

**Daily:**
- Morning: Today's schedule summary
- End of day: Tomorrow's schedule

**Real-time:**
- Customer checked in
- Customer is late
- Cancellation received
- Emergency changes

### To Admin:

**Immediate:**
- No-shows (after 30 min)
- Payment issues
- Customer complaints
- System errors

**Daily Summary:**
- Number of appointments
- Completion rate
- No-show rate
- Revenue

---

## Financial Rules

### Pricing Transparency
- All prices shown upfront
- Include taxes in displayed price
- Show duration clearly

### Deposit Requirements
**Required for:**
- Customers with 3+ no-shows
- First-time customers (optional)
- Services > $500

**Deposit Amount:**
- 25% of service price
- Applied to final payment
- Refunded if cancelled per policy

### Refund Policy
- **Before service:** Per cancellation policy
- **After service:** Only for serious quality issues
- **No-show:** No refund
- **Business cancellation:** Full refund + 10% credit

---

## Data Tracking & Analytics

### Key Metrics to Track

**Customer Level:**
- No-show rate
- Late arrival frequency
- Average spending
- Service preferences
- Feedback ratings

**Resource Level:**
- Appointments per day
- Completion rate
- Customer satisfaction
- Revenue generated
- Average service time

**Business Level:**
- Daily/weekly/monthly revenue
- Most popular services
- Peak hours
- Cancellation rate
- New vs returning customers

### Use Cases:
- Identify problematic customers (repeated no-shows)
- Reward reliable customers (loyalty program)
- Adjust scheduling based on patterns
- Resource performance reviews

---

## Customer Communication Templates

### No-Show Follow-Up
```
Hola [Nombre],

Notamos que no pudiste asistir a tu cita de [Servicio] hoy a las [Hora].

Esperamos que todo esté bien. Si tuviste una emergencia, por favor contáctanos dentro de las próximas 24 horas.

De acuerdo con nuestra política, se ha aplicado un cargo de $[Monto] a tu método de pago.

¿Te gustaría reagendar? Haz clic aquí: [Link]

Saludos,
[Negocio]
```

### Late Arrival Warning (At 5 min late)
```
Hola [Nombre],

Tu cita es a las [Hora] y aún no has llegado. 
Por favor, avísanos si vas retrasado.

Si llegas más de 15 minutos tarde, es posible que tengamos que acortar tu servicio.

¿Necesitas reagendar? Contáctanos.
```

### Completion & Feedback Request
```
¡Gracias por visitarnos, [Nombre]!

Esperamos que hayas disfrutado tu [Servicio] con [Recurso].

¿Cómo fue tu experiencia? [Rating: 1-5 estrellas]

Tu opinión nos ayuda a mejorar.

¡Hasta pronto!
```

---

## System Rules & Validations

### Booking Validations
- ✅ No double-booking same resource
- ✅ Respect resource working hours
- ✅ Check for scheduled breaks/lunch
- ✅ Respect minimum advance booking (e.g., 2 hours)
- ✅ Maximum advance booking (e.g., 90 days)
- ✅ Service duration fits available slot

### Cancellation Validations
- ✅ Check time until appointment
- ✅ Calculate applicable fee
- ✅ Verify customer identity
- ✅ Prevent cancellation if already started

### Status Change Validations
- ✅ Confirmed → In Progress (only at/near appointment time)
- ✅ In Progress → Completed (only by resource or admin)
- ✅ Cannot revert from Completed
- ✅ No-Show → Can be disputed within 24h

---

## Future Enhancements

### Planned Features
1. **Waitlist System:** When slots full, customers join waitlist
2. **Loyalty Program:** Points per visit, rewards for regulars
3. **Dynamic Pricing:** Surge pricing for peak hours
4. **AI Predictions:** Predict no-shows based on history
5. **Two-Way SMS:** Customers reply to confirmations
6. **Multi-location:** Support for multiple branches

---

## Testing Checklist

### Scenarios to Test
- [ ] Happy path: Book → Arrive → Complete
- [ ] Book and cancel > 24h before
- [ ] Book and cancel < 2h before
- [ ] Customer doesn't show up
- [ ] Customer arrives 20 min late
- [ ] Attempt double booking
- [ ] Resource calls in sick
- [ ] Customer wants to extend service
- [ ] Payment card declined
- [ ] Customer disputes no-show fee

---

**Last Updated:** February 16, 2026  
**Version:** 1.0  
**Owner:** Admin Team
