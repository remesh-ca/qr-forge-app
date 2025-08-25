import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type CsvData = {
  headers: string[];
  rows: { [key: string]: string }[];
};

interface DataTableProps {
  data: CsvData;
}

export default function DataTable({ data }: DataTableProps) {
  return (
    <Card className="flex-grow lg:sticky lg:top-8">
      <CardHeader>
        <CardTitle>Step 2: Preview Your Data</CardTitle>
        <CardDescription>
          Here&apos;s a preview of your CSV data. Use the sidebar to select the columns you want to include in the QR codes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {data.headers.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.length > 0 ? (
                data.rows.map((row, i) => (
                  <TableRow key={i}>
                    {data.headers.map((header) => (
                      <TableCell key={header}>{row[header]}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={data.headers.length} className="h-24 text-center">
                    No data to display.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
