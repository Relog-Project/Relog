import React from "react"
export function DashboardHeader({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-4 md:px-8 md:py-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground md:text-sm">{description}</p>
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  )
}
