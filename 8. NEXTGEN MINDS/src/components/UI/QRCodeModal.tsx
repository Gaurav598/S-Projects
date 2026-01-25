import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ShareIcon } from '@heroicons/react/24/outline';
import QRCode from 'react-qr-code';
import { useAppStore } from '../../lib/store';
import { useTranslation } from '../../lib/translations';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Button } from './Button';

export const QRCodeModal: React.FC = () => {
  const { showQRCode, qrCodeUrl, setQRCode } = useAppStore();
  const { t } = useTranslation() || { t: (key: string) => key };
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

const handleClose = () => {
  setQRCode(false, "");
};


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NextGen Minds',
          text: t ? t("qrCodeTitle") : "QR Code",
          url: qrCodeUrl || window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(qrCodeUrl);
    }
  };

  return (
    <AnimatePresence>
      {showQRCode && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants.modalBackdrop}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            variants={variants.modalContent}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/20 dark:border-white/10 relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-accent-500/5 pointer-events-none"></div>
            
            <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t ? t('shareQR') : 'Share QR'}
              </h3>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 dark:hover:bg-black/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="bg-white p-6 rounded-2xl inline-block shadow-2xl border border-gray-200/50 backdrop-blur-sm">
                {qrCodeUrl ? (
                <QRCode
                  value={qrCodeUrl}
                  size={200}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  />
                  ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                  No QR code available
                  </p>
                  )}

              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 font-medium">
              {t ? t('qrCodeTitle') : 'QR Code'}
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleShare}
                className="flex-1 flex items-center justify-center"
              >
                <ShareIcon className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};