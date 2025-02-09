// "use client"

// import { Bar, BarChart, XAxis, YAxis } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// interface IncomeChartProps {
//   data: {
//     type: string;
//     amount: number;
//     fill: string;
//   }[];
// }

// export function IncomeChart({ data }: IncomeChartProps) {
//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle>Income Overview</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <BarChart
//           width={300}
//           height={200}
//           data={data}
//           layout="vertical"
//           margin={{ left: 20 }}
//         >
//           <YAxis dataKey="type" type="category" tickLine={false} axisLine={false} />
//           <XAxis type="number" hide />
//           <Bar dataKey="amount" fill="#8884d8" radius={5} />
//         </BarChart>
//       </CardContent>
//     </Card>
//   )
// }