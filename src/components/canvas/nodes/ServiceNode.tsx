import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import type { ServiceNodeData } from '@/types/graph';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Settings, Cpu, HardDrive, Database, MapPin } from 'lucide-react';

export function ServiceNode({ data }: NodeProps<ServiceNodeData>): JSX.Element {
  const statusVariant =
    data.status === 'healthy' ? 'default' : data.status === 'error' ? 'destructive' : 'secondary';

  const statusText = data.status === 'healthy' ? 'Success' : data.status === 'error' ? 'Error' : 'Degraded';

  return (
    <div className="w-[300px] rounded-2xl bg-black border border-neutral-800 p-5 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base"
            style={{ backgroundColor: data.iconBg || '#6366f1' }}
          >
            {data.icon || data.name.charAt(0).toUpperCase()}
          </div>
          {/* Name */}
          <span className="text-white font-medium text-base">{data.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Price Badge */}
          <Badge className="bg-emerald-950/50 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-950/50 px-2.5 py-1 text-xs font-normal">
            ${data.price.toFixed(2)}/HR
          </Badge>
          {/* Settings Icon */}
          <button className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center border border-neutral-800 transition-colors">
            <Settings className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex items-center gap-2 mb-3">
        <button className="flex-1 h-8 bg-white text-black rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium hover:bg-neutral-100">
          <Cpu className="w-3.5 h-3.5" />
          CPU
        </button>
        <button className="flex-1 h-8 bg-neutral-900 text-neutral-400 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium hover:bg-neutral-800 border border-neutral-800">
          <Database className="w-3.5 h-3.5" />
          Memory
        </button>
        <button className="flex-1 h-8 bg-neutral-900 text-neutral-400 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium hover:bg-neutral-800 border border-neutral-800">
          <HardDrive className="w-3.5 h-3.5" />
          Disk
        </button>
        <button className="flex-1 h-8 bg-neutral-900 text-neutral-400 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium hover:bg-neutral-800 border border-neutral-800">
          <MapPin className="w-3.5 h-3.5" />
          Region
        </button>
      </div>

      {/* Metric Values */}
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="text-neutral-400">{data.cpu.toFixed(2)}</span>
        <span className="text-neutral-400">{data.memory.toFixed(2)} GB</span>
        <span className="text-neutral-400">{data.disk.toFixed(2)} GB</span>
        <span className="text-neutral-400">{data.region}</span>
      </div>

      {/* Gradient Slider */}
      <div className="mb-5 relative">
        <div className="relative h-2 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-red-500">
          <div
            className="absolute w-4 h-4 bg-white rounded-full border-2 border-black shadow-lg cursor-pointer"
            style={{ 
              left: `${data.cpu}%`, 
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
        <div className="flex justify-end mt-2">
          <span className="text-xs text-neutral-400 font-medium">{data.cpu.toFixed(2)}</span>
        </div>
      </div>

      {/* Status and Provider */}
      <div className="flex items-center justify-between">
        <Badge
          variant={statusVariant}
          className={`${
            data.status === 'healthy'
              ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30'
              : 'bg-red-950/50 text-red-400 border-red-500/30'
          } hover:bg-opacity-80 px-2.5 py-1`}
        >
          <span className="mr-1.5">●</span>
          {statusText}
        </Badge>

        {data.provider && (
          <div className="text-right bg-neutral-900 rounded-md px-2 py-1 border border-neutral-800">
            {data.provider === 'aws' && (
              <svg
                className="w-14 h-6"
                viewBox="0 0 48 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8 16.3c0 .6-.1 1.1-.2 1.5-.1.4-.3.8-.5 1.2-.1.1-.1.3 0 .4l1.4 1c.1.1.3.1.4 0 .4-.4.7-.9.9-1.4.2-.5.4-1.1.4-1.8 0-1.5-.4-2.6-1.3-3.4-.9-.8-2.1-1.2-3.6-1.2-1.6 0-2.9.4-3.8 1.3-.9.9-1.4 2-1.4 3.4v.2c0 1.4.4 2.5 1.3 3.4.9.9 2.1 1.3 3.7 1.3.6 0 1.1-.1 1.6-.2.5-.1 1-.3 1.5-.5.2-.1.3-.2.3-.4v-1.4c0-.2-.1-.3-.3-.3-.5.2-.9.3-1.4.4-.5.1-.9.1-1.4.1-1 0-1.8-.2-2.3-.7-.5-.5-.8-1.2-.8-2.1v-.2c0-.9.3-1.6.8-2.1.5-.5 1.3-.7 2.2-.7.9 0 1.6.2 2.1.7.5.5.7 1.1.7 2zm8.9 6c-.5 0-1-.1-1.4-.2-.5-.2-.9-.4-1.3-.7-.2-.1-.3-.2-.3-.4v-1.4c0-.2.1-.3.3-.3.1 0 .2 0 .3.1.4.2.8.4 1.2.5.4.1.9.2 1.3.2.7 0 1.2-.1 1.6-.4.4-.2.6-.6.6-1.1 0-.3-.1-.6-.3-.8-.2-.2-.6-.4-1.1-.6l-1.6-.5c-.8-.3-1.4-.7-1.8-1.2-.4-.5-.6-1-.6-1.7 0-.5.1-.9.3-1.3.2-.4.5-.7.9-1 .4-.3.8-.5 1.3-.6.5-.1 1-.2 1.6-.2.2 0 .5 0 .7.1.2 0 .5.1.7.1.2.1.4.1.6.2.2.1.4.2.5.2.2.1.3.2.3.4v1.3c0 .2-.1.3-.3.3-.1 0-.2 0-.4-.1-.6-.3-1.3-.4-2-.4-.3 0-.6 0-.8.1-.3 0-.5.1-.7.2-.2.1-.4.2-.5.4-.1.2-.2.4-.2.6 0 .3.1.6.3.8.2.2.6.4 1.2.6l1.5.5c.8.3 1.4.6 1.8 1.1.4.5.5 1 .5 1.6 0 .5-.1.9-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.9.5-1.4.7-.6.2-1.2.2-1.9.2zm12.8-.2c-.2 0-.3-.1-.4-.2l-3.6-11.6c0-.1-.1-.2-.1-.2 0-.1.1-.2.2-.2h1.9c.2 0 .3.1.4.2l2.5 9.2 2.5-9.2c0-.1.2-.2.4-.2h1.9c.1 0 .2.1.2.2 0 0 0 .1-.1.2L38 21.9c-.1.1-.2.2-.4.2h-1.1z"
                  fill="#FF9900"
                />
                <path
                  d="M43.7 26.6c-4.4 3.2-10.7 4.9-16.2 4.9-7.7 0-14.6-2.8-19.8-7.5-.4-.4 0-.9.4-.6 5.5 3.2 12.3 5.1 19.3 5.1 4.7 0 9.9-1 14.7-3 .7-.3 1.3.5.6 1.1z"
                  fill="#FF9900"
                />
                <path
                  d="M45.5 24.5c-.6-.7-3.7-.4-5.1-.2-.4.1-.5-.3-.1-.6 2.5-1.7 6.6-1.2 7.1-.6.5.6-.1 4.7-2.5 6.7-.4.3-.7.2-.6-.3.6-1.4 1.8-4.3 1.2-5z"
                  fill="#FF9900"
                />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Top} className="!bg-neutral-600" />
      <Handle type="source" position={Position.Bottom} className="!bg-neutral-600" />
    </div>
  );
}
